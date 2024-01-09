import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FacilityGame } from '../entities/facilityGame.entity';
import { FacilityGameService } from '../services/facilityGame.service';
import { FacilityGameController } from '../controllers/facilityGame.controller';

@Module({
    imports: [TypeOrmModule.forFeature([FacilityGame])],
    controllers: [FacilityGameController],
    providers: [FacilityGameService],
    exports: [FacilityGameService]
})
export class FacilityGameModule { }
