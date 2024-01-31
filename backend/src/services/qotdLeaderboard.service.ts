import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QOTDEntry } from 'src/entities/qotdLeaderboard.entity';

@Injectable()
export class QOTDLeaderboardService {
    constructor(
        @InjectRepository(QOTDEntry)
        private qotdRepository: Repository<QOTDEntry>
    ) { }

    findAll(): Promise<QOTDEntry[]> {
        return this.qotdRepository.find();
    }

    async findOne(discord_id: string): Promise<QOTDEntry> {
        const entity = await this.qotdRepository.findOne({
            where: {
                discord_id: discord_id
            }
        });
        if (!entity) {
            throw new NotFoundException(`No points for user with discord id ${discord_id} found.`);
        }
        return entity;
    }

    async remove(discord_id: string): Promise<void> {
        const entity = await this.findOne(discord_id);
        await this.qotdRepository.remove(entity);
    }

    async update(discord_id: string, updateDto: Partial<QOTDEntry>): Promise<QOTDEntry> {
        const entity = await this.findOne(discord_id);
        const updatedEntity = Object.assign(entity, updateDto);
        return this.qotdRepository.save(updatedEntity);
    }

    async save(createDto: Partial<QOTDEntry>): Promise<QOTDEntry> {
        const existingUser = await this.qotdRepository.findOne({ 
            where: { discord_id: createDto.discord_id } 
        });

        if (existingUser) {
            throw new ConflictException(`User with the discord id ${createDto.discord_id} already has an entry in the leaderboard.`);
        }

        const newEntity = this.qotdRepository.create(createDto as any);
        try {
            return await this.qotdRepository.save(newEntity as any);
        } catch (error) {
            throw new BadRequestException(`Failed to save new qotd leaderboard entry: ${error.message}`);
        }
    }
}
