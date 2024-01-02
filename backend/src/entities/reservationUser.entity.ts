import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('reservation_users')
export class ReservationUser {
    @PrimaryColumn({ type: 'varchar', length: 255 })
    uin: string;

    @Column({ type: 'boolean', default: false })
    is_admin: boolean;
}