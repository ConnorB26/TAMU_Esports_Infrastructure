import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCodeService } from '../services/userCode.service';
import { UserCodeController } from '../controllers/userCode.controller';
import { UserCode } from '../entities/userCode.entity';
import { UserService } from 'src/services/user.service';
import { ConfirmationCodeService } from 'src/services/confirmationCode.service';
import { UserModule } from './user.module';
import { ConfirmationCodeModule } from './confirmationCode.module';

@Module({
    imports: [TypeOrmModule.forFeature([UserCode]), UserModule, ConfirmationCodeModule],
    controllers: [UserCodeController],
    providers: [UserCodeService],
    exports: [UserCodeService]
})
export class UserCodeModule { }
