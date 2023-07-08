import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRole } from 'src/entities/userRole.entity';

@Injectable()
export class UserRoleService {
    constructor(
        @InjectRepository(UserRole)
        private userRoleRepository: Repository<UserRole>,
    ) { }

    findAll(): Promise<UserRole[]> {
        return this.userRoleRepository.find();
    }

    async findOne(discordId: string, roleId: number): Promise<UserRole> {
        const entity = await this.userRoleRepository.findOne({
            where: {
                discordId: discordId,
                roleId: roleId
            }
        });
        if (!entity) {
            throw new NotFoundException(`User role with discordId ${discordId} and roleId ${roleId} not found.`);
        }
        return entity;
    }

    async remove(discordId: string, roleId: number): Promise<void> {
        const entity = await this.findOne(discordId, roleId);
        await this.userRoleRepository.remove(entity);
    }

    async update(discordId: string, roleId: number, updateDto: Partial<UserRole>): Promise<UserRole> {
        const entity = await this.findOne(discordId, roleId);
        const updatedEntity = Object.assign(entity, updateDto);
        return this.userRoleRepository.save(updatedEntity);
    }

    async save(createDto: Partial<UserRole>): Promise<UserRole> {
        const newEntity = this.userRoleRepository.create(createDto as any);
        return this.userRoleRepository.save(newEntity as any);
    }
}
