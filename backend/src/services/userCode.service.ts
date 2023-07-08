import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCode } from 'src/entities/userCode.entity';

@Injectable()
export class UserCodeService {
    constructor(
        @InjectRepository(UserCode)
        private userCodeRepository: Repository<UserCode>,
    ) { }

    findAll(): Promise<UserCode[]> {
        return this.userCodeRepository.find();
    }

    async findOne(discordId: string, code: string): Promise<UserCode> {
        const entity = await this.userCodeRepository.findOne({
            where: {
                discordId: discordId,
                code: code
            }
        });
        if (!entity) {
            throw new NotFoundException(`User code with discordId ${discordId} and code ${code} not found.`);
        }
        return entity;
    }

    async remove(discordId: string, code: string): Promise<void> {
        const entity = await this.findOne(discordId, code);
        await this.userCodeRepository.remove(entity);
    }

    async update(discordId: string, code: string, updateDto: Partial<UserCode>): Promise<UserCode> {
        const entity = await this.findOne(discordId, code);
        const updatedEntity = Object.assign(entity, updateDto);
        return this.userCodeRepository.save(updatedEntity);
    }

    async save(createDto: Partial<UserCode>): Promise<UserCode> {
        const newEntity = this.userCodeRepository.create(createDto as any);
        return this.userCodeRepository.save(newEntity as any);
    }
}
