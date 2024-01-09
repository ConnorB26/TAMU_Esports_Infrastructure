import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { BaseService } from './base.service';
import { ReservationParticipant, ReservationParticipantDTO } from 'src/entities/reservationParticipant.entity';

@Injectable()
export class ReservationParticipantService extends BaseService<ReservationParticipant> {
    constructor(
        @InjectRepository(ReservationParticipant)
        private reservationParticipantRepository: Repository<ReservationParticipant>,
    ) {
        super(reservationParticipantRepository);
    }

    async addParticipants(reservationId: number, participants: ReservationParticipantDTO[]): Promise<void> {
        participants.forEach(async participant => {
            const newParticipant = this.repository.create({
                reservation_id: reservationId,
                uin: participant.uin,
                is_creator: participant.is_creator
            });
            await this.save(newParticipant);
        });
    }

    async isCreator(reservationId: number, uin: string): Promise<boolean> {
        const participant = await this.repository.findOne({
            where: { reservation_id: reservationId, uin, is_creator: true }
        });
        return !!participant;
    }

    async findByUin(uin: string): Promise<ReservationParticipant[]> {
        return this.findAllBy({ uin });
    }

    async updateParticipants(reservationId: number, newParticipants: ReservationParticipantDTO[]): Promise<void> {
        // Get current participants
        const currentParticipants = await this.findByReservationId(reservationId);

        // Find participants to remove (exist in current but not in new)
        const participantsToRemove = currentParticipants.filter(participant =>
            !newParticipants.some(newParticipant => newParticipant.uin === participant.uin));

        // Find participants to add (exist in new but not in current)
        const participantsToAdd = newParticipants.filter(newParticipant =>
            !currentParticipants.some(participant => participant.uin === newParticipant.uin));

        // Remove participants
        for (const participant of participantsToRemove) {
            await this.removeByCompositeKey(reservationId, participant.uin);
        }

        // Add new participants
        for (const participant of participantsToAdd) {
            const newParticipant = this.repository.create({
                reservation_id: reservationId,
                uin: participant.uin,
                is_creator: participant.is_creator
            });
            await this.save(newParticipant);
        }
    }

    async findByReservationId(reservationId: number): Promise<ReservationParticipant[]> {
        return this.findAllBy({ reservation_id: reservationId });
    }

    async removeByCompositeKey(reservationId: number, uin: string): Promise<void> {
        const entity = await this.findOne({ reservation_id: reservationId, uin });
        await this.repository.remove(entity);
    }

    async updateByCompositeKey(reservationId: number, uin: string, updateDto: DeepPartial<ReservationParticipant>): Promise<ReservationParticipant> {
        let entity = await this.findOne({ reservation_id: reservationId, uin });
        Object.assign(entity, updateDto);
        return this.repository.save(entity);
    }
}
