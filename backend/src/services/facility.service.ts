import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Facility, FacilityDTO } from 'src/entities/facility.entity';
import { BaseService } from './base.service';
import { FacilityGameService } from './facilityGame.service';
import { GameService } from './game.service';

@Injectable()
export class FacilityService extends BaseService<Facility> {
    constructor(
        @InjectRepository(Facility)
        private facilityRepository: Repository<Facility>,
        private facilityGameService: FacilityGameService,
        private gameService: GameService
    ) {
        super(facilityRepository);
    }

    async findAllWithGames(): Promise<FacilityDTO[]> {
        const facilities = await this.findAll();
        const facilitiesWithGames = await Promise.all(facilities.map(async facility => {
            const games = await this.facilityGameService.findGamesByFacilityId(facility.id);
            return {
                ...facility,
                games: games.map(game => game.name)
            };
        }));
        return facilitiesWithGames;
    }

    async findWithGames(id: number): Promise<FacilityDTO> {
        const facility = await this.findOne({ id });
        const games = await this.facilityGameService.findGamesByFacilityId(id);
        return {
            ...facility,
            games: games.map(game => game.name)
        };
    }
}
