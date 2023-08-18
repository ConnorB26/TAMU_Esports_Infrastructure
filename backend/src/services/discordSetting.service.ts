import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
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

    async updateName(name: string, updateDto: Partial<DiscordSetting>): Promise<DiscordSetting> {
        const entity = await this.discordSettingRepository.findOne({
            where: {
                name: name
            }
        });
        if (!entity) {
            throw new NotFoundException(`Discord setting with name ${name} not found.`);
        }
        const updatedEntity = Object.assign(entity, updateDto);
        return this.discordSettingRepository.save(updatedEntity);
    }

    async save(createDto: Partial<DiscordSetting>): Promise<DiscordSetting> {
        const exists = await this.discordSettingRepository.findOne({
            where: { name: createDto.name }
        });
        if (exists) {
            throw new ConflictException(`Discord setting with name ${createDto.name} already exists.`);
        }
        const newEntity = this.discordSettingRepository.create(createDto as any);
        try {
            return await this.discordSettingRepository.save(newEntity as any);
        } catch (error) {
            throw new BadRequestException(`Failed to save the Discord setting: ${error.message}`);
        }
    }
}
