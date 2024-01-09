import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationParticipantService } from '../services/reservationParticipant.service';
import { ReservationParticipantController } from '../controllers/reservationParticipant.controller';
import { ReservationParticipant } from '../entities/reservationParticipant.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ReservationParticipant])],
    controllers: [ReservationParticipantController],
    providers: [ReservationParticipantService],
    exports: [ReservationParticipantService]
})
export class ReservationParticipantModule { }
