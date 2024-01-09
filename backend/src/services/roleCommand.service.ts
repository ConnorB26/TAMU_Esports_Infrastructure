import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleCommand } from 'src/entities/roleCommand.entity';
import { BaseService } from './base.service';

@Injectable()
export class RoleCommandService extends BaseService<RoleCommand> {
    constructor(
        @InjectRepository(RoleCommand)
        private roleCommandRepository: Repository<RoleCommand>,
    ) {
        super(roleCommandRepository);
    }

    async findOneByRoleIdAndCommandName(roleId: string, commandName: string): Promise<RoleCommand> {
        return this.findOne({ role_id: roleId, command_name: commandName });
    }

    async removeByRoleIdAndCommandName(roleId: string, commandName: string): Promise<void> {
        const entity = await this.findOneByRoleIdAndCommandName(roleId, commandName);
        await this.roleCommandRepository.remove(entity);
    }

    async save(createDto: Partial<RoleCommand>): Promise<RoleCommand> {
        const exists = await this.findOneByRoleIdAndCommandName(createDto.role_id, createDto.command_name);
        if (exists) {
            throw new ConflictException(`Permission for command name ${createDto.command_name} already exists for role ID ${createDto.role_id}.`);
        }
        return super.save(createDto);
    }

    async updateById(id: number, updateDto: Partial<RoleCommand>): Promise<RoleCommand> {
        let entity = await this.findOne({ id });
        if (!entity) {
            throw new NotFoundException(`Permission with ID ${id} not found.`);
        }
        Object.assign(entity, updateDto);
        return this.roleCommandRepository.save(entity);
    }
}
