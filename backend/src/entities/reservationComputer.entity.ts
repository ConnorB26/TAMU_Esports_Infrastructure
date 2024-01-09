import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('reservation_computers')
export class ReservationComputer {
    @PrimaryColumn()
    reservation_id: number;

    @PrimaryColumn()
    computer_id: number;
}
