import { Entity, PrimaryColumn, Column } from 'typeorm';
import { IsString, IsBoolean } from 'class-validator';

@Entity('reservation_participants')
export class ReservationParticipant {
    @PrimaryColumn()
    reservation_id: number;

    @PrimaryColumn({ type: 'varchar', length: 255 })
    uin: string;

    @Column({ type: 'boolean', default: false })
    is_creator: boolean;
}

export class ReservationParticipantDTO {
    @IsString()
    uin: string;

    @IsBoolean()
    is_creator: boolean;
}
