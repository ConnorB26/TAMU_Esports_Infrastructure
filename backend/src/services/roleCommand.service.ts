import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleCommand } from 'src/entities/roleCommand.entity';

@Injectable()
export class RoleCommandService {
    constructor(
        @InjectRepository(RoleCommand)
        private roleCommandRepository: Repository<RoleCommand>,
    ) { }

    findAll(): Promise<RoleCommand[]> {
        return this.roleCommandRepository.find();
    }

    async findOne(id: number): Promise<RoleCommand> {
        const entity = await this.roleCommandRepository.findOne({
            where: {
                id: id
            }
        });
        if (!entity) {
            throw new NotFoundException(`Permission with id ${id} not found.`);
        }
        return entity;
    }

    async remove(id: number): Promise<void> {
        const entity = await this.findOne(id);
        await this.roleCommandRepository.remove(entity);
    }

    async removeVals(role_id: string, command_name: string): Promise<void> {
        const entity = await this.roleCommandRepository.findOne({
            where: {
                role_id: role_id,
                command_name: command_name
            }
        });
        if (!entity) {
            throw new NotFoundException(`Permission with role ID ${role_id} and command name ${command_name} not found.`);
        }
        await this.roleCommandRepository.remove(entity);
    }

    async update(id: number, updateDto: Partial<RoleCommand>): Promise<RoleCommand> {
        const entity = await this.findOne(id);
        const updatedEntity = Object.assign(entity, updateDto);
        return this.roleCommandRepository.save(updatedEntity);
    }

    async save(createDto: Partial<RoleCommand>): Promise<RoleCommand> {
        const exists = await this.roleCommandRepository.findOne({
            where: { 
                role_id: createDto.role_id, 
                command_name: createDto.command_name 
            }
        });
        if (exists) {
            throw new ConflictException(`Permission for the command name ${createDto.command_name} already exists for role id ${createDto.role_id}.`);
        }
        const newEntity = this.roleCommandRepository.create(createDto as any);
        try {
            return await this.roleCommandRepository.save(newEntity as any);
        } catch (error) {
            throw new BadRequestException(`Failed to save the permission: ${error.message}`);
        }
    }
}
