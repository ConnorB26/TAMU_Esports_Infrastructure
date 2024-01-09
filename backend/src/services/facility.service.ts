import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Facility } from 'src/entities/facility.entity';
import { BaseService } from './base.service';

@Injectable()
export class FacilityService extends BaseService<Facility> {
    constructor(
        @InjectRepository(Facility)
        private facilityRepository: Repository<Facility>,
    ) {
        super(facilityRepository);
    }
}
