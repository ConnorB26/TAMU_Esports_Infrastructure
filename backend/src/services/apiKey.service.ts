import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiKey } from 'src/entities/apiKey.entity';

@Injectable()
export class ApiKeyService {
    constructor(
        @InjectRepository(ApiKey)
        private apiKeyRepository: Repository<ApiKey>,
    ) { }

    findAll(): Promise<ApiKey[]> {
        return this.apiKeyRepository.find();
    }

    async findOne(id: number): Promise<ApiKey> {
        const entity = await this.apiKeyRepository.findOne({
            where: {
                id: id
            }
        });
        if (!entity) {
            throw new NotFoundException(`API Key with id ${id} not found.`);
        }
        return entity;
    }

    async remove(id: number): Promise<void> {
        const entity = await this.findOne(id);
        await this.apiKeyRepository.remove(entity);
    }

    async update(id: number, updateDto: Partial<ApiKey>): Promise<ApiKey> {
        const entity = await this.findOne(id);
        const updatedEntity = Object.assign(entity, updateDto);
        return this.apiKeyRepository.save(updatedEntity);
    }

    async save(createDto: Partial<ApiKey>): Promise<ApiKey> {
        const exists = await this.apiKeyRepository.findOne({
            where: { api_key: createDto.api_key }
        });
        if (exists) {
            throw new ConflictException(`API Key ${createDto.api_key} already exists.`);
        }
        const newEntity = this.apiKeyRepository.create(createDto);
        try {
            return await this.apiKeyRepository.save(newEntity);
        } catch (error) {
            throw new BadRequestException(`Failed to save the API Key: ${error.message}`);
        }
    }

    async validateApiKey(apiKey: string): Promise<boolean> {
        const key = await this.apiKeyRepository.findOne({
            where: { api_key: apiKey, is_active: true }
        });
        return !!key;
    }
}
