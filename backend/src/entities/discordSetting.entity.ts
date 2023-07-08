import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('discord_settings')
export class DiscordSetting {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'varchar', length: 255 })
    value: string;
}
