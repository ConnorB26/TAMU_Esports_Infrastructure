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

    async findOne(discordId: string): Promise<User> {
        const entity = await this.userRepository.findOne({
            where: {
                discordId: discordId
            }
        });
        if (!entity) {
            throw new NotFoundException(`User with discordId ${discordId} not found.`);
        }
        return entity;
    }

    async remove(discordId: string): Promise<void> {
        const entity = await this.findOne(discordId);
        await this.userRepository.remove(entity);
    }

    async update(discordId: string, updateDto: Partial<User>): Promise<User> {
        const entity = await this.findOne(discordId);
        const updatedEntity = Object.assign(entity, updateDto);
        return this.userRepository.save(updatedEntity);
    }

    async save(createDto: Partial<User>): Promise<User> {
        const newEntity = this.userRepository.create(createDto as any);
        return this.userRepository.save(newEntity as any);
    }
}
