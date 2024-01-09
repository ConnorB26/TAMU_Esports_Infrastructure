import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { BaseService } from './base.service';
import { FacilityGame } from 'src/entities/facilityGame.entity';

@Injectable()
export class FacilityGameService extends BaseService<FacilityGame> {
    constructor(
        @InjectRepository(FacilityGame)
        private facilityGameRepository: Repository<FacilityGame>,
    ) {
        super(facilityGameRepository);
    }

    async removeByCompositeKey(facilityId: number, gameId: number): Promise<void> {
        const entity = await this.findOne({ facility_id: facilityId, game_id: gameId });
        await this.repository.remove(entity);
    }

    async updateByCompositeKey(facilityId: number, gameId: number, updateDto: DeepPartial<FacilityGame>): Promise<FacilityGame> {
        let entity = await this.findOne({ facility_id: facilityId, game_id: gameId });
        Object.assign(entity, updateDto);
        return this.repository.save(entity);
    }
}
