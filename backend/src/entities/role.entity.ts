import { IsArray, IsString } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('roles')
@Unique(['roleName'])
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'role_name' })
    roleName: string;

    @Column("text", { array: true })
    permissions: string[];
}

export class RoleDto {
    @IsString()
    roleName: string;

    @IsArray()
    permissions: string[];
}