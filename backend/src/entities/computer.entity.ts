import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Facility } from './facility.entity';

@Entity('computers')
export class Computer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @ManyToOne(() => Facility, facility => facility.id)
    @Column()
    facility_id: number;

    @Column({ type: 'varchar', length: 50 })
    status: string;
}
