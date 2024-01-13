import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationComputerService } from '../services/reservationComputer.service';
import { ReservationComputerController } from '../controllers/reservationComputer.controller';
import { ReservationComputer } from '../entities/reservationComputer.entity';
import { ReservationAuthModule } from './reservationAuth.module';

@Module({
    imports: [TypeOrmModule.forFeature([ReservationComputer]), ReservationAuthModule],
    controllers: [ReservationComputerController],
    providers: [ReservationComputerService],
    exports: [ReservationComputerService]
})
export class ReservationComputerModule { }
