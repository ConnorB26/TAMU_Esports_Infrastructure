import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReservationUser } from 'src/entities/reservationUser.entity';

@Injectable()
export class ReservationUserService {
    constructor(
        @InjectRepository(ReservationUser)
        private reservationUserRepository: Repository<ReservationUser>,
    ) { }

    findAll(): Promise<ReservationUser[]> {
        return this.reservationUserRepository.find();
    }

    async findOne(uin: string): Promise<ReservationUser> {
        const entity = await this.reservationUserRepository.findOne({
            where: {
                uin: uin
            }
        });
        if (!entity) {
            throw new NotFoundException(`Reservation user with uin ${uin} not found.`);
        }
        return entity;
    }

    async remove(uin: string): Promise<void> {
        const entity = await this.findOne(uin);
        await this.reservationUserRepository.remove(entity);
    }

    async update(uin: string, updateDto: Partial<ReservationUser>): Promise<ReservationUser> {
        let entity = await this.reservationUserRepository.findOne({ where: { uin } });

        if (!entity) {
            entity = this.reservationUserRepository.create({ uin, ...updateDto });
        } else {
            Object.assign(entity, updateDto);
        }

        return this.reservationUserRepository.save(entity);
    }

    async save(createDto: Partial<ReservationUser>): Promise<ReservationUser> {
        const exists = await this.reservationUserRepository.findOne({
            where: { uin: createDto.uin }
        });
        if (exists) {
            throw new ConflictException(`Reservation user with uin ${createDto.uin} already exists.`);
        }
        const newEntity = this.reservationUserRepository.create(createDto as any);
        try {
            return await this.reservationUserRepository.save(newEntity as any);
        } catch (error) {
            throw new BadRequestException(`Failed to save the reservation user: ${error.message}`);
        }
    }
}
