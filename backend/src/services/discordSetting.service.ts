import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DiscordSetting } from 'src/entities/discordSetting.entity';
import { BaseService } from './base.service';

@Injectable()
export class DiscordSettingService extends BaseService<DiscordSetting> {
    constructor(
        @InjectRepository(DiscordSetting)
        private discordSettingRepository: Repository<DiscordSetting>,
    ) {
        super(discordSettingRepository);
    }

    async findOneByName(name: string): Promise<DiscordSetting> {
        return this.findOne({ name });
    }

    async updateByName(name: string, updateDto: Partial<DiscordSetting>): Promise<DiscordSetting> {
        let entity = await this.findOneByName(name);
        if (!entity) {
            throw new NotFoundException(`Discord setting with name ${name} not found.`);
        }
        Object.assign(entity, updateDto);
        return this.discordSettingRepository.save(entity);
    }

    async save(createDto: Partial<DiscordSetting>): Promise<DiscordSetting> {
        const existingSetting = await this.findOneByName(createDto.name);
        if (existingSetting) {
            throw new ConflictException(`Discord setting with name ${createDto.name} already exists.`);
        }
        return super.save(createDto);
    }
}
