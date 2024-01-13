import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Game } from './game.entity';

@Entity('facility_games')
export class FacilityGame {
    @PrimaryColumn()
    facility_id: number;

    @PrimaryColumn()
    game_id: number;

    @ManyToOne(() => Game, game => game.facilityGames)
    @JoinColumn({ name: 'game_id' })
    game: Game;
}
