import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QOTDEntry } from 'src/entities/qotdLeaderboard.entity';
import { BaseService } from './base.service';

@Injectable()
export class QOTDLeaderboardService extends BaseService<QOTDEntry> {
    constructor(
        @InjectRepository(QOTDEntry)
        private qotdRepository: Repository<QOTDEntry>,
    ) {
        super(qotdRepository);
    }

    async findOneByDiscordId(discord_id: string): Promise<QOTDEntry> {
        return this.findOne({ discord_id });
    }

    async save(createDto: Partial<QOTDEntry>): Promise<QOTDEntry> {
        const existingUser = await this.findOneByDiscordId(createDto.discord_id);
        if (existingUser) {
            throw new ConflictException(`User with discord id ${createDto.discord_id} already has an entry in the leaderboard.`);
        }
        return super.save(createDto);
    }

    async updateByDiscordId(discord_id: string, updateDto: Partial<QOTDEntry>): Promise<QOTDEntry> {
        let entity = await this.findOneByDiscordId(discord_id);
        if (!entity) {
            throw new NotFoundException(`No points for user with discord id ${discord_id} found.`);
        }
        Object.assign(entity, updateDto);
        return this.qotdRepository.save(entity);
    }
}
