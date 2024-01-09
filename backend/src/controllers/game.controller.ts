import { Body, Controller, Delete, Get, Param, Post, Put, ParseIntPipe, UseGuards } from '@nestjs/common';
import { Game } from 'src/entities/game.entity';
import { GameService } from 'src/services/game.service';
import { ReservationAdminGuard } from 'src/guards/reservationAdmin.guard';

@Controller('games')
@UseGuards(ReservationAdminGuard)
export class GameController {
    constructor(private readonly gameService: GameService) { }

    @Post()
    create(@Body() gameDto: Game) {
        return this.gameService.save(gameDto);
    }

    @Get()
    findAll() {
        return this.gameService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.gameService.findOne({ id });
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.gameService.remove(id.toString());
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() gameDto: Game) {
        return this.gameService.update(id.toString(), gameDto);
    }
}
