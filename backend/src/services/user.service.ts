import { Injectable, NotFoundException } from '@nestjs/common';
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
            throw new NotFoundException(`User with uin ${uin} not found.`);
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
        const newEntity = this.userRepository.create(createDto as any);
        return this.userRepository.save(newEntity as any);
    }
}
