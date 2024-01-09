import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCode } from 'src/entities/userCode.entity';
import { BaseService } from './base.service';
import { UserService } from './user.service';
import { ConfirmationCodeService } from './confirmationCode.service';
import { ConflictException } from '@nestjs/common';

@Injectable()
export class UserCodeService extends BaseService<UserCode> {
    constructor(
        @InjectRepository(UserCode)
        private userCodeRepository: Repository<UserCode>,
        private userService: UserService,
        private confirmationCodeService: ConfirmationCodeService
    ) {
        super(userCodeRepository);
    }

    async findOneByUinAndCode(uin: string, code: string): Promise<UserCode> {
        return this.findOne({ uin, code });
    }

    async findByUser(uin: string): Promise<UserCode> {
        return this.findOne({ uin });
    }

    async findByCode(code: string): Promise<UserCode> {
        return this.findOne({ code });
    }

    async removeByUinAndCode(uin: string, code: string): Promise<void> {
        const entity = await this.findOneByUinAndCode(uin, code);
        await this.userCodeRepository.remove(entity);
    }

    async removeByUser(uin: string): Promise<void> {
        const entity = await this.findByUser(uin);
        await this.userCodeRepository.remove(entity);
    }

    async save(createDto: Partial<UserCode>): Promise<UserCode> {
        const existingUin = await this.findOne({ uin: createDto.uin });
        const existingCode = await this.findOne({ code: createDto.code });

        if (existingUin || existingCode) {
            throw new ConflictException(`Membership with provided UIN or code already exists.`);
        }

        // Check if linked user exists
        await this.userService.findOne({ uin: createDto.uin });

        // Check if linked confirmation code exists
        await this.confirmationCodeService.findOne({ code: createDto.code });

        return super.save(createDto);
    }

    async updateByUinAndCode(uin: string, code: string, updateDto: Partial<UserCode>): Promise<UserCode> {
        let entity = await this.findOneByUinAndCode(uin, code);
        Object.assign(entity, updateDto);
        return this.userCodeRepository.save(entity);
    }
}
