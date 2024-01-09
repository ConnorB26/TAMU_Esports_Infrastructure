import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiKey } from 'src/entities/apiKey.entity';
import { BaseService } from './base.service';

@Injectable()
export class ApiKeyService extends BaseService<ApiKey> {
    constructor(
        @InjectRepository(ApiKey)
        private apiKeyRepository: Repository<ApiKey>,
    ) {
        super(apiKeyRepository);
    }

    async save(createDto: Partial<ApiKey>): Promise<ApiKey> {
        const existingApiKey = await this.findOne({ api_key: createDto.api_key });
        if (existingApiKey) {
            throw new ConflictException(`API Key ${createDto.api_key} already exists.`);
        }
        return super.save(createDto);
    }

    async validateApiKey(apiKey: string): Promise<boolean> {
        const key = await this.findOne({ api_key: apiKey, is_active: true });
        return !!key;
    }
}
