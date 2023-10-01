import { IsNumber, IsString } from 'class-validator';
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('qotd_leaderboard')
export class QOTDEntry {
    @PrimaryColumn()
    discord_id: string;

    @Column()
    score: number;
}

export class QOTDEntryDTO {
    @IsString()
    discord_id: string;

    @IsNumber()
    score: number;
}