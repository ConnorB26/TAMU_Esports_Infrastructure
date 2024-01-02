import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationUserService } from 'src/services/reservationUser.service';
import { ReservationUserController } from 'src/controllers/reservationUser.controller';
import { ReservationUser } from 'src/entities/reservationUser.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ReservationUser])],
    controllers: [ReservationUserController],
    providers: [ReservationUserService],
    exports: [ReservationUserService]
})
export class ReservationUserModule { }
