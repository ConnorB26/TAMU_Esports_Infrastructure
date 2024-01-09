import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { BaseService } from './base.service';
import { ConflictException } from '@nestjs/common';

@Injectable()
export class UserService extends BaseService<User> {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {
        super(userRepository);
    }

    async findOneByUin(uin: string): Promise<User> {
        return this.findOne({ uin });
    }

    async findOneByDiscordId(discordId: string): Promise<User> {
        return this.findOne({ discord_id: discordId });
    }

    async save(createDto: Partial<User>): Promise<User> {
        const uinExists = await this.findOneByUin(createDto.uin);
        const discordIdExists = await this.findOneByDiscordId(createDto.discord_id);

        if (uinExists || discordIdExists) {
            throw new ConflictException(`User with provided UIN or Discord ID already exists.`);
        }

        return super.save(createDto);
    }

    async updateByUin(uin: string, updateDto: Partial<User>): Promise<User> {
        let entity = await this.findOneByUin(uin);
        Object.assign(entity, updateDto);
        return this.userRepository.save(entity);
    }

    async updateByDiscordId(discordId: string, updateDto: Partial<User>): Promise<User> {
        let entity = await this.findOneByDiscordId(discordId);
        Object.assign(entity, updateDto);
        return this.userRepository.save(entity);
    }

    async removeByUin(uin: string): Promise<void> {
        const entity = await this.findOneByUin(uin);
        await this.userRepository.remove(entity);
    }

    async removeByDiscordId(discordId: string): Promise<void> {
        const entity = await this.findOneByDiscordId(discordId);
        await this.userRepository.remove(entity);
    }

    async hasPaidDues(uin: string): Promise<boolean> {
        const user = await this.findOne({ uin, has_paid_dues: true });
        return !!user;
    }
}
