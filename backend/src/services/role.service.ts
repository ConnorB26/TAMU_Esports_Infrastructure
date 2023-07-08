import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from 'src/entities/role.entity';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(Role)
        private roleRepository: Repository<Role>,
    ) { }

    findAll(): Promise<Role[]> {
        return this.roleRepository.find();
    }

    async findOne(id: number): Promise<Role> {
        const entity = await this.roleRepository.findOne({
            where: {
                id: id
            }
        });
        if (!entity) {
            throw new NotFoundException(`Role with id ${id} not found.`);
        }
        return entity;
    }

    async remove(id: number): Promise<void> {
        const entity = await this.findOne(id);
        await this.roleRepository.remove(entity);
    }

    async update(id: number, updateDto: Partial<Role>): Promise<Role> {
        const entity = await this.findOne(id);
        const updatedEntity = Object.assign(entity, updateDto);
        return this.roleRepository.save(updatedEntity);
    }

    async save(createDto: Partial<Role>): Promise<Role> {
        const newEntity = this.roleRepository.create(createDto as any);
        return this.roleRepository.save(newEntity as any);
    }
}
