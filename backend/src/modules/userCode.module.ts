import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCodeService } from '../services/userCode.service';
import { UserCodeController } from '../controllers/userCode.controller';
import { UserCode } from '../entities/userCode.entity';

@Module({
    imports: [TypeOrmModule.forFeature([UserCode])],
    controllers: [UserCodeController],
    providers: [UserCodeService],
    exports: [UserCodeService]
})
export class UserCodeModule { }
