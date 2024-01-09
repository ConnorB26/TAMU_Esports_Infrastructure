import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('facility_games')
export class FacilityGame {
    @PrimaryColumn()
    facility_id: number;

    @PrimaryColumn()
    game_id: number;
}
