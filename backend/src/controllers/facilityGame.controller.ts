import { Body, Controller, Delete, Get, Param, Post, Put, ParseIntPipe, UseGuards } from '@nestjs/common';
import { FacilityGame } from 'src/entities/facilityGame.entity';
import { FacilityGameService } from 'src/services/facilityGame.service';
import { ReservationAdminGuard } from 'src/guards/reservationAdmin.guard';

@Controller('facility_games')
@UseGuards(ReservationAdminGuard)
export class FacilityGameController {
    constructor(private readonly facilityGameService: FacilityGameService) { }

    @Post()
    create(@Body() facilityGameDto: FacilityGame) {
        return this.facilityGameService.save(facilityGameDto);
    }

    @Get()
    findAll() {
        return this.facilityGameService.findAll();
    }

    @Get(':facilityId/:gameId')
    findOne(@Param('facilityId', ParseIntPipe) facilityId: number, @Param('gameId', ParseIntPipe) gameId: number) {
        return this.facilityGameService.findOne({ facility_id: facilityId, game_id: gameId });
    }

    @Delete(':facilityId/:gameId')
    remove(@Param('facilityId', ParseIntPipe) facilityId: number, @Param('gameId', ParseIntPipe) gameId: number) {
        return this.facilityGameService.removeByCompositeKey(facilityId, gameId);
    }

    @Put(':facilityId/:gameId')
    update(@Param('facilityId', ParseIntPipe) facilityId: number, @Param('gameId', ParseIntPipe) gameId: number, @Body() facilityGameDto: FacilityGame) {
        return this.facilityGameService.updateByCompositeKey(facilityId, gameId, facilityGameDto);
    }
}
