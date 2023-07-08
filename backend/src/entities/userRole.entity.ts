import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Role } from './role.entity';
import { IsInt, IsString } from 'class-validator';

@Entity('user_roles')
export class UserRole {
    @PrimaryColumn({ name: 'discord_id' })
    discordId: string;

    @PrimaryColumn({ name: 'role_id' })
    roleId: number;

    @ManyToOne(() => User, user => user.discordId)
    @JoinColumn({ name: "discord_id" })
    user: User;

    @ManyToOne(() => Role, role => role.id)
    @JoinColumn({ name: "role_id" })
    role: Role;
}

export class UserRoleDto {
    @IsString()
    discordId: string;

    @IsInt()
    roleId: number;
}