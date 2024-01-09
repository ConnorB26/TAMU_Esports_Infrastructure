import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Computer } from '../entities/computer.entity';
import { ComputerService } from '../services/computer.service';
import { ComputerController } from '../controllers/computer.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Computer])],
    controllers: [ComputerController],
    providers: [ComputerService],
    exports: [ComputerService]
})
export class ComputerModule { }
