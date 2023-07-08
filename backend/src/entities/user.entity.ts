import { IsBoolean, IsString } from 'class-validator';
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('users')
export class User {
    @PrimaryColumn({ name: 'discord_id' })
    discordId: string;

    @Column({ name: 'has_paid_dues', default: false })
    hasPaidDues: boolean;
}

export class UserDto {
    @IsString()
    discordId: string;

    @IsBoolean()
    hasPaidDues: boolean;
}