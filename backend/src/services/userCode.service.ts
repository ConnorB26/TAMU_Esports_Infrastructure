import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCode } from 'src/entities/userCode.entity';
import { UserService } from './user.service';
import { ConfirmationCodeService } from './confirmationCode.service';

@Injectable()
export class UserCodeService {
    constructor(
        @InjectRepository(UserCode)
        private userCodeRepository: Repository<UserCode>,
        private userService: UserService,
        private confirmationCodeService: ConfirmationCodeService
    ) { }

    findAll(): Promise<UserCode[]> {
        return this.userCodeRepository.find();
    }

    async findOne(uin: string, code: string): Promise<UserCode> {
        const entity = await this.userCodeRepository.findOne({
            where: {
                uin: uin,
                code: code
            }
        });
        if (!entity) {
            throw new NotFoundException(`Membership with uin ${uin} and code ${code} not found.`);
        }
        return entity;
    }

    async findByUser(uin: string): Promise<UserCode> {
        const entity = await this.userCodeRepository.findOne({
            where: {
                uin: uin
            }
        });
        if (!entity) {
            throw new NotFoundException(`Membership with uin ${uin} not found.`);
        }
        return entity;
    }

    async findByCode(code: string): Promise<UserCode> {
        const entity = await this.userCodeRepository.findOne({
            where: {
                code: code
            }
        });
        if (!entity) {
            throw new NotFoundException(`Membership with code ${code} not found.`);
        }
        return entity;
    }

    async remove(uin: string, code: string): Promise<void> {
        const entity = await this.findOne(uin, code);
        await this.userCodeRepository.remove(entity);
    }

    async removeUser(uin: string): Promise<void> {
        const entity = await this.findByUser(uin);
        await this.userCodeRepository.remove(entity);
    }

    async removeAll(): Promise<void> {
        const entities = await this.findAll();
        await this.userCodeRepository.remove(entities);
    }

    async update(uin: string, code: string, updateDto: Partial<UserCode>): Promise<UserCode> {
        const entity = await this.findOne(uin, code);
        const updatedEntity = Object.assign(entity, updateDto);
        return this.userCodeRepository.save(updatedEntity);
    }

    async save(createDto: Partial<UserCode>): Promise<UserCode> {
        const existingUin = await this.userCodeRepository.findOne({
            where: { uin: createDto.uin }
        });

        const existingCode = await this.userCodeRepository.findOne({
            where: { code: createDto.code }
        });

        if (existingUin) {
            throw new ConflictException(`Membership with UIN ${createDto.uin} already exists.`);
        }

        if (existingCode) {
            throw new ConflictException(`Membership with code ${createDto.code} already exists.`);
        }

        // Check if linked user exists
        await this.userService.findOne(createDto.uin);

        // Check if linked confirmation code exists
        await this.confirmationCodeService.findOne(createDto.code);

        const newEntity = this.userCodeRepository.create(createDto as any);
        try {
            return await this.userCodeRepository.save(newEntity as any);
        } catch (error) {
            throw new BadRequestException(`Failed to save the membership: ${error.message}`);
        }
    }
}
