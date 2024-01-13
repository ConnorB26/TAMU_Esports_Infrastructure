import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Facility } from '../entities/facility.entity';
import { FacilityService } from '../services/facility.service';
import { FacilityController } from '../controllers/facility.controller';
import { FacilityGameModule } from './facilityGame.module';
import { GameModule } from './game.module';
import { ReservationAuthModule } from './reservationAuth.module';

@Module({
    imports: [TypeOrmModule.forFeature([Facility]), FacilityGameModule, GameModule, ReservationAuthModule],
    controllers: [FacilityController],
    providers: [FacilityService],
    exports: [FacilityService]
})
export class FacilityModule { }
