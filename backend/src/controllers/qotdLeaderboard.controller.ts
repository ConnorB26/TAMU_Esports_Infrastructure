import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { QOTDEntryDTO } from 'src/entities/qotdLeaderboard.entity';
import { QOTDLeaderboardService } from 'src/services/qotdLeaderboard.service';

@Controller('qotd_leader')
export class QOTDLeaderboardController {
    constructor(private readonly qotdService: QOTDLeaderboardService) { }

    @Post()
    create(@Body() qotdDTO: QOTDEntryDTO) {
        return this.qotdService.save(qotdDTO);
    }

    @Get()
    findAll() {
        return this.qotdService.findAll();
    }

    @Get(':discord_id')
    findByDiscord(@Param('discord_id') discord_id: string) {
        return this.qotdService.findOne(discord_id);
    }

    @Delete(':discord_id')
    remove(@Param('discord_id') discord_id: string) {
        return this.qotdService.remove(discord_id);
    }

    @Put(':discord_id')
    update(@Param('discord_id') discord_id: string, @Body() qotdDTO: QOTDEntryDTO) {
        return this.qotdService.update(discord_id, qotdDTO);
    }
}
