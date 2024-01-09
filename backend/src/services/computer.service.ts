import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Computer } from 'src/entities/computer.entity';
import { BaseService } from './base.service';

@Injectable()
export class ComputerService extends BaseService<Computer> {
    constructor(
        @InjectRepository(Computer)
        private computerRepository: Repository<Computer>,
    ) {
        super(computerRepository);
    }
}
