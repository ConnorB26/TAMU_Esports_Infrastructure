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

    async findOne(uin: string, code: string): Promise<UserCode> {
        const entity = await this.userCodeRepository.findOne({
            where: {
                uin: uin,
                code: code
            }
        });
        if (!entity) {
            throw new NotFoundException(`User code with uin ${uin} and code ${code} not found.`);
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
            throw new NotFoundException(`User code with uin ${uin} not found.`);
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
            throw new NotFoundException(`User code with code ${code} not found.`);
        }
        return entity;
    }

    async remove(uin: string, code: string): Promise<void> {
        const entity = await this.findOne(uin, code);
        await this.userCodeRepository.remove(entity);
    }

    async removeUser(uin: string): Promise<void> {
        const entity = await this.userCodeRepository.findOne({
            where: {
                uin: uin
            }
        });
        if (!entity) {
            throw new NotFoundException(`User code with uin ${uin} not found.`);
        }
        await this.userCodeRepository.remove(entity);
    }

    async update(uin: string, code: string, updateDto: Partial<UserCode>): Promise<UserCode> {
        const entity = await this.findOne(uin, code);
        const updatedEntity = Object.assign(entity, updateDto);
        return this.userCodeRepository.save(updatedEntity);
    }

    async save(createDto: Partial<UserCode>): Promise<UserCode> {
        const newEntity = this.userCodeRepository.create(createDto as any);
        return this.userCodeRepository.save(newEntity as any);
    }
}
