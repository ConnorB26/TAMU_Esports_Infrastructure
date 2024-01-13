import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { FacilityGame } from './facilityGame.entity';

@Entity('games')
export class Game {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @OneToMany(() => FacilityGame, facilityGame => facilityGame.game)
    facilityGames: FacilityGame[];
}
