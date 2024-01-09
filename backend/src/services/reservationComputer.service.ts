import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { BaseService } from './base.service';
import { ReservationComputer } from 'src/entities/reservationComputer.entity';

@Injectable()
export class ReservationComputerService extends BaseService<ReservationComputer> {
    constructor(
        @InjectRepository(ReservationComputer)
        private reservationComputerRepository: Repository<ReservationComputer>,
    ) {
        super(reservationComputerRepository);
    }

    async addComputers(reservationId: number, computers: number[]): Promise<void> {
        computers.forEach(async computer => {
            const newComputer = this.reservationComputerRepository.create({
                reservation_id: reservationId,
                computer_id: computer
            });
            await this.save(newComputer);
        });
    }

    async updateComputers(reservationId: number, newComputers: number[]): Promise<void> {
        // Get current computers
        const currentComputers = await this.findByReservationId(reservationId);

        // Find computers to remove (exist in current but not in new)
        const computersToRemove = currentComputers.filter(computer =>
            !newComputers.includes(computer.computer_id));

        // Find computers to add (exist in new but not in current)
        const computersToAdd = newComputers.filter(newComputer =>
            !currentComputers.some(computer => computer.computer_id === newComputer));

        // Remove computers
        for (const computer of computersToRemove) {
            await this.removeByCompositeKey(reservationId, computer.computer_id);
        }

        // Add new computers
        for (const computerId of computersToAdd) {
            const newComputer = this.repository.create({
                reservation_id: reservationId,
                computer_id: computerId
            });
            await this.save(newComputer);
        }
    }

    async findByReservationId(reservationId: number): Promise<ReservationComputer[]> {
        return this.findAllBy({ reservation_id: reservationId });
    }

    async removeByCompositeKey(reservationId: number, computerId: number): Promise<void> {
        const entity = await this.findOne({ reservation_id: reservationId, computer_id: computerId });
        await this.repository.remove(entity);
    }

    async updateByCompositeKey(reservationId: number, computerId: number, updateDto: DeepPartial<ReservationComputer>): Promise<ReservationComputer> {
        let entity = await this.findOne({ reservation_id: reservationId, computer_id: computerId });
        Object.assign(entity, updateDto);
        return this.repository.save(entity);
    }
}
