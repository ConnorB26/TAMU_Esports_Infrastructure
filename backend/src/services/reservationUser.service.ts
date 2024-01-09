import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReservationUser } from 'src/entities/reservationUser.entity';
import { BaseService } from './base.service';

@Injectable()
export class ReservationUserService extends BaseService<ReservationUser> {
    constructor(
        @InjectRepository(ReservationUser)
        private reservationUserRepository: Repository<ReservationUser>,
    ) {
        super(reservationUserRepository);
    }

    async findOneByUin(uin: string): Promise<ReservationUser> {
        return this.findOne({ uin });
    }

    async save(createDto: Partial<ReservationUser>): Promise<ReservationUser> {
        const exists = await this.findOneByUin(createDto.uin);
        if (exists) {
            throw new ConflictException(`Reservation user with UIN ${createDto.uin} already exists.`);
        }
        return super.save(createDto);
    }

    async updateByUin(uin: string, updateDto: Partial<ReservationUser>): Promise<ReservationUser> {
        let entity = await this.findOneByUin(uin);
        if (!entity) {
            throw new NotFoundException(`Reservation user with UIN ${uin} not found.`);
        }
        Object.assign(entity, updateDto);
        return this.reservationUserRepository.save(entity);
    }
}
