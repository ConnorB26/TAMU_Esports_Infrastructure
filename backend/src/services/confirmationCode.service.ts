import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfirmationCode } from 'src/entities/confirmationCode.entity';

@Injectable()
export class ConfirmationCodeService {
    constructor(
        @InjectRepository(ConfirmationCode)
        private confirmationCodeRepository: Repository<ConfirmationCode>,
    ) { }

    findAll(): Promise<ConfirmationCode[]> {
        return this.confirmationCodeRepository.find();
    }

    async findOne(code: string): Promise<ConfirmationCode> {
        const entity = await this.confirmationCodeRepository.findOne({
            where: {
                code: code
            }
        });
        if (!entity) {
            throw new NotFoundException(`Confirmation code ${code} not found.`);
        }
        return entity;
    }

    async remove(code: string): Promise<void> {
        const entity = await this.findOne(code);
        await this.confirmationCodeRepository.remove(entity);
    }

    async update(code: string, updateDto: Partial<ConfirmationCode>): Promise<ConfirmationCode> {
        const entity = await this.findOne(code);
        const updatedEntity = Object.assign(entity, updateDto);
        return this.confirmationCodeRepository.save(updatedEntity);
    }

    async save(createDto: Partial<ConfirmationCode>): Promise<ConfirmationCode> {
        const exists = await this.confirmationCodeRepository.findOne({
            where: { code: createDto.code }
        });
        if (exists) {
            throw new ConflictException(`Confirmation code ${createDto.code} already exists.`);
        }
        const newEntity = this.confirmationCodeRepository.create(createDto as any);
        try {
            return await this.confirmationCodeRepository.save(newEntity as any);
        } catch (error) {
            throw new BadRequestException(`Failed to save the confirmation code: ${error.message}`);
        }
    }
}
