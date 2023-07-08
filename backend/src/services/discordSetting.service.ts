import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DiscordSetting } from 'src/entities/discordSetting.entity';

@Injectable()
export class DiscordSettingService {
    constructor(
        @InjectRepository(DiscordSetting)
        private discordSettingRepository: Repository<DiscordSetting>,
    ) { }

    findAll(): Promise<DiscordSetting[]> {
        return this.discordSettingRepository.find();
    }

    async findOne(id: number): Promise<DiscordSetting> {
        const entity = await this.discordSettingRepository.findOne({
            where: {
                id: id
            }
        });
        if (!entity) {
            throw new NotFoundException(`Discord setting with id ${id} not found.`);
        }
        return entity;
    }

    async remove(id: number): Promise<void> {
        const entity = await this.findOne(id);
        await this.discordSettingRepository.remove(entity);
    }

    async update(id: number, updateDto: Partial<DiscordSetting>): Promise<DiscordSetting> {
        const entity = await this.findOne(id);
        const updatedEntity = Object.assign(entity, updateDto);
        return this.discordSettingRepository.save(updatedEntity);
    }

    async save(createDto: Partial<DiscordSetting>): Promise<DiscordSetting> {
        const newEntity = this.discordSettingRepository.create(createDto as any);
        return this.discordSettingRepository.save(newEntity as any);
    }
}
