import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from './base.service';
import { Game } from 'src/entities/game.entity';

@Injectable()
export class GameService extends BaseService<Game> {
    constructor(
        @InjectRepository(Game)
        private gameRepository: Repository<Game>,
    ) {
        super(gameRepository);
    }
}
