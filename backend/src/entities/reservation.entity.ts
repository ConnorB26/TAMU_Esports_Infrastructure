import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsDate, IsOptional, IsString, IsArray, IsInt } from 'class-validator';
import { ReservationParticipantDTO } from './reservationParticipant.entity';

@Entity('reservations')
export class Reservation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int', nullable: true })
    game_id: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    team: string;

    @Column({ type: 'text', nullable: true })
    event: string;

    @Column({ type: 'timestamptz' })
    start_time: Date;

    @Column({ type: 'timestamptz' })
    end_time: Date;

    @Column({ type: 'varchar', length: 50, default: 'pending' })
    status: string;

    @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;
}

export class ReservationDto {
    @IsOptional()
    @IsInt()
    game_id?: number;

    @IsOptional()
    @IsString()
    team?: string;

    @IsOptional()
    @IsString()
    event?: string;

    @IsDate()
    start_time: Date;

    @IsDate()
    end_time: Date;

    @IsArray()
    participants: ReservationParticipantDTO[];

    @IsArray()
    @IsInt({ each: true })
    computers: number[];
}
