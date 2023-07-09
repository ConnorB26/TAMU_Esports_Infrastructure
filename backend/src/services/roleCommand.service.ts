import { Injectable, NotFoundException } from '@nestjs/common';
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
            throw new NotFoundException(`Role command with id ${id} not found.`);
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
        await this.roleCommandRepository.remove(entity);
    }

    async update(id: number, updateDto: Partial<RoleCommand>): Promise<RoleCommand> {
        const entity = await this.findOne(id);
        const updatedEntity = Object.assign(entity, updateDto);
        return this.roleCommandRepository.save(updatedEntity);
    }

    async save(createDto: Partial<RoleCommand>): Promise<RoleCommand> {
        const newEntity = this.roleCommandRepository.create(createDto as any);
        return this.roleCommandRepository.save(newEntity as any);
    }
}
