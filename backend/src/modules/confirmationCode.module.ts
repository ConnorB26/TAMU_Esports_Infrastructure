import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfirmationCodeService } from '../services/confirmationCode.service';
import { ConfirmationCodeController } from '../controllers/confirmationCode.controller';
import { ConfirmationCode } from '../entities/confirmationCode.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ConfirmationCode])],
    controllers: [ConfirmationCodeController],
    providers: [ConfirmationCodeService],
    exports: [ConfirmationCodeService]
})
export class ConfirmationCodeModule { }
