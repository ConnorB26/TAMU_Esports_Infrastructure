import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfirmationCode } from 'src/entities/confirmationCode.entity';
import { BaseService } from './base.service';

@Injectable()
export class ConfirmationCodeService extends BaseService<ConfirmationCode> {
    constructor(
        @InjectRepository(ConfirmationCode)
        private confirmationCodeRepository: Repository<ConfirmationCode>,
    ) {
        super(confirmationCodeRepository);
    }

    async save(createDto: Partial<ConfirmationCode>): Promise<ConfirmationCode> {
        const existingCode = await this.findOne({ code: createDto.code });
        if (existingCode) {
            throw new ConflictException(`Confirmation code ${createDto.code} already exists.`);
        }
        return super.save(createDto);
    }
}
