import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from '../entities/game.entity';
import { GameService } from '../services/game.service';
import { GameController } from '../controllers/game.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Game])],
    controllers: [GameController],
    providers: [GameService],
    exports: [GameService]
})
export class GameModule { }
