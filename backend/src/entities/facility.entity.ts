import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('facilities')
export class Facility {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'text' })
    location: string;

    @Column({ type: 'text' })
    hours: string;

    @Column({ type: 'text' })
    pc_specs: string;

    @Column({ type: 'text', nullable: true })
    map_image_url: string;
}
