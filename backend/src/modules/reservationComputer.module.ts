import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationComputerService } from '../services/reservationComputer.service';
import { ReservationComputerController } from '../controllers/reservationComputer.controller';
import { ReservationComputer } from '../entities/reservationComputer.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ReservationComputer])],
    controllers: [ReservationComputerController],
    providers: [ReservationComputerService],
    exports: [ReservationComputerService]
})
export class ReservationComputerModule { }
