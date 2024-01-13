import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationService } from '../services/reservation.service';
import { ReservationController } from '../controllers/reservation.controller';
import { Reservation } from '../entities/reservation.entity';
import { ReservationComputerModule } from './reservationComputer.module';
import { ReservationParticipantModule } from './reservationParticipant.module';
import { UserModule } from './user.module';
import { ReservationAuthModule } from './reservationAuth.module';

@Module({
    imports: [TypeOrmModule.forFeature([Reservation]), ReservationComputerModule, ReservationParticipantModule, UserModule, ReservationAuthModule],
    controllers: [ReservationController],
    providers: [ReservationService],
    exports: [ReservationService]
})
export class ReservationModule { }
