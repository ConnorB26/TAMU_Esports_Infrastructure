import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QOTDEntry } from 'src/entities/qotdLeaderboard.entity';
import { QOTDLeaderboardController } from 'src/controllers/qotdLeaderboard.controller';
import { QOTDLeaderboardService } from 'src/services/qotdLeaderboard.service';

@Module({
    imports: [TypeOrmModule.forFeature([QOTDEntry])],
    controllers: [QOTDLeaderboardController],
    providers: [QOTDLeaderboardService],
    exports: [QOTDLeaderboardService]
})
export class QOTDLeaderboardModule { }
