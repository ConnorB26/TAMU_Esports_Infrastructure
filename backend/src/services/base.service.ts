import { Repository, ObjectLiteral, DeepPartial, FindOptionsWhere, FindManyOptions } from 'typeorm';
import { NotFoundException, BadRequestException } from '@nestjs/common';

export abstract class BaseService<T extends ObjectLiteral> {
    protected constructor(protected readonly repository: Repository<T>) { }

    findAll(options?: FindManyOptions<T>): Promise<T[]> {
        return this.repository.find(options);
    }

    async findAllBy(conditions: FindOptionsWhere<T>): Promise<T[]> {
        const entities = await this.repository.find({ where: conditions });
        if (!entities) {
            throw new NotFoundException(`Entities not found.`);
        }
        return entities;
    }

    async findOne(conditions: FindOptionsWhere<T>): Promise<T> {
        const entity = await this.repository.findOne({ where: conditions });
        if (!entity) {
            throw new NotFoundException(`Entity not found.`);
        }
        return entity;
    }

    async remove(id: string): Promise<void> {
        const entity = await this.findOne({ id: id as any });
        await this.repository.remove(entity);
    }

    async save(createDto: DeepPartial<T>): Promise<T> {
        const newEntity = this.repository.create(createDto as DeepPartial<T>);
        try {
            return await this.repository.save(newEntity);
        } catch (error) {
            throw new BadRequestException(`Failed to save the entity: ${error.message}`);
        }
    }

    async update(id: string, updateDto: DeepPartial<T>): Promise<T> {
        let entity = await this.findOne({ id: id as any });
        if (!entity) {
            throw new NotFoundException(`Entity not found.`);
        }
        Object.assign(entity, updateDto);
        return this.repository.save(entity as DeepPartial<T>);
    }
}
