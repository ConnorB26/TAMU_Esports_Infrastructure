import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationService } from '../services/reservation.service';
import { ReservationController } from '../controllers/reservation.controller';
import { Reservation } from '../entities/reservation.entity';
import { ReservationParticipantService } from '../services/reservationParticipant.service';
import { ReservationComputerService } from '../services/reservationComputer.service';
import { ReservationParticipant } from '../entities/reservationParticipant.entity';
import { ReservationComputer } from '../entities/reservationComputer.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Reservation, ReservationParticipant, ReservationComputer])],
    controllers: [ReservationController],
    providers: [ReservationService, ReservationParticipantService, ReservationComputerService],
    exports: [ReservationService, ReservationParticipantService, ReservationComputerService]
})
export class ReservationModule { }
