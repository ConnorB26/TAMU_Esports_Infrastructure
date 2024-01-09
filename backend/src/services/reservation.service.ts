import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation, ReservationDto } from 'src/entities/reservation.entity';
import { ReservationParticipantService } from './reservationParticipant.service';
import { ReservationComputerService } from './reservationComputer.service';
import { In, Repository } from 'typeorm';
import { BaseService } from './base.service';
import { UserService } from './user.service';

@Injectable()
export class ReservationService extends BaseService<Reservation> {
    constructor(
        @InjectRepository(Reservation)
        private reservationRepository: Repository<Reservation>,
        private reservationParticipantService: ReservationParticipantService,
        private reservationComputerService: ReservationComputerService,
        private userService: UserService
    ) {
        super(reservationRepository);
    }

    async createReservation(reservationDto: ReservationDto, uin: string): Promise<Reservation> {
        // Check if all participants have paid dues
        const unpaidParticipants = [];
        for (const participant of reservationDto.participants) {
            if (!(await this.userService.hasPaidDues(participant.uin))) {
                unpaidParticipants.push(participant.uin);
            }
        }
        if (unpaidParticipants.length > 0) {
            throw new BadRequestException(`Participants with UINs ${unpaidParticipants.join(', ')} have not paid dues.`);
        }

        // Create the reservation
        const reservation = await this.save(reservationDto);

        // Add participants and computers to the reservation
        await this.reservationParticipantService.addParticipants(reservation.id, reservationDto.participants);
        await this.reservationComputerService.addComputers(reservation.id, reservationDto.computers);

        return reservation;
    }

    async updateReservation(id: number, reservationDto: ReservationDto, uin: string): Promise<void> {
        // Repeat the dues checking process as in createReservation
        const unpaidParticipants = [];
        for (const participant of reservationDto.participants) {
            if (!(await this.userService.hasPaidDues(participant.uin))) {
                unpaidParticipants.push(participant.uin);
            }
        }
        if (unpaidParticipants.length > 0) {
            throw new BadRequestException(`Participants with UINs ${unpaidParticipants.join(', ')} have not paid dues.`);
        }

        // Ensure the user updating the reservation is the creator
        const isCreator = await this.reservationParticipantService.isCreator(id, uin);
        if (!isCreator) {
            throw new BadRequestException('Only the creator can update the reservation.');
        }

        // Update the reservation and its associated participants and computers
        await this.update(id.toString(), reservationDto);
        await this.reservationParticipantService.updateParticipants(id, reservationDto.participants);
        await this.reservationComputerService.updateComputers(id, reservationDto.computers);
    }

    async deleteReservation(id: number, uin: string): Promise<void> {
        const isCreator = await this.reservationParticipantService.isCreator(id, uin);
        if (!isCreator) {
            throw new BadRequestException('Only the creator can delete the reservation.');
        }

        await this.remove(id.toString());
    }

    async findUserReservations(uin: string): Promise<Reservation[]> {
        // Get reservation IDs where the user is a participant
        const participantEntries = await this.reservationParticipantService.findByUin(uin);
        const reservationIds = participantEntries.map(entry => entry.reservation_id);

        // Fetch reservations using the IDs
        const reservations = await this.findAll({
            where: { id: In(reservationIds) },
            order: { start_time: 'ASC' }
        });

        // Filter out past reservations
        const currentDateTime = new Date();
        return reservations.filter(reservation => reservation.start_time > currentDateTime);
    }
}
