import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async findOne(uin: string): Promise<User> {
        const entity = await this.userRepository.findOne({
            where: {
                uin: uin
            }
        });
        if (!entity) {
            throw new NotFoundException(`User with that UIN not found.`);
        }
        return entity;
    }

    async findOneDiscord(discordID: string): Promise<User> {
        const entity = await this.userRepository.findOne({
            where: {
                discord_id: discordID
            }
        });
        if (!entity) {
            throw new NotFoundException(`User with discord ID ${discordID} not found.`);
        }
        return entity;
    }

    async getDiscordIDsForReset(): Promise<string[]> {
        const users = await this.userRepository.find({
            where: {
                has_paid_dues: true
            }
        });

        return users.map(u => u.discord_id);
    }

    async remove(uin: string): Promise<void> {
        const entity = await this.findOne(uin);
        await this.userRepository.remove(entity);
    }

    async removeDiscord(discordID: string): Promise<void> {
        const entity = await this.findOneDiscord(discordID);
        await this.userRepository.remove(entity);
    }

    async update(uin: string, updateDto: Partial<User>): Promise<User> {
        const entity = await this.findOne(uin);
        const updatedEntity = Object.assign(entity, updateDto);
        return this.userRepository.save(updatedEntity);
    }

    async updateDiscord(discordID: string, updateDto: Partial<User>): Promise<User> {
        const entity = await this.findOneDiscord(discordID);
        const updatedEntity = Object.assign(entity, updateDto);
        return this.userRepository.save(updatedEntity);
    }

    async save(createDto: Partial<User>): Promise<User> {
        const uinExists = await this.userRepository.findOne({
            where: {
                uin: createDto.uin
            }
        });

        const discordIdExists = await this.userRepository.findOne({
            where: {
                discord_id: createDto.discord_id
            }
        });

        if (uinExists) {
            throw new ConflictException(`User with that UIN already exists.`);
        }

        if (discordIdExists) {
            throw new ConflictException(`You are already registered.`);
        }

        const newEntity = this.userRepository.create(createDto as any);
        try {
            return await this.userRepository.save(newEntity as any);
        } catch (error) {
            throw new BadRequestException(`Failed to save the user: ${error.message}`);
        }
    }
}
