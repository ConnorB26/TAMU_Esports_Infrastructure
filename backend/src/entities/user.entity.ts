import { Column, Entity, PrimaryColumn } from 'typeorm';
import { IsString, IsBoolean } from 'class-validator';

@Entity('users')
export class User {
    @PrimaryColumn({ type: 'varchar', length: 255 })
    uin: string;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'varchar', length: 255 })
    email: string;

    @Column({ type: 'varchar', length: 255 })
    discord_id: string;

    @Column({ type: 'boolean', default: false })
    has_paid_dues: boolean;
}

export class UserDto {
    @IsString()
    uin: string;

    @IsString()
    name: string;

    @IsString()
    email: string;

    @IsString()
    discord_id: string;

    @IsBoolean()
    has_paid_dues: boolean;
}