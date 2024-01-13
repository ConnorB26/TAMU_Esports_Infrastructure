import { Body, Controller, Delete, Get, Param, Post, Put, ParseIntPipe, UseGuards } from '@nestjs/common';
import { Facility } from 'src/entities/facility.entity';
import { FacilityService } from 'src/services/facility.service';
import { ReservationAdminGuard } from 'src/guards/reservationAdmin.guard';
import { DiscordAuthGuard } from 'src/guards/discordAuth.guard';

@Controller('facilities')
export class FacilityController {
    constructor(private readonly facilityService: FacilityService) { }

    @Post()
    @UseGuards(ReservationAdminGuard)
    create(@Body() facilityDto: Facility) {
        return this.facilityService.save(facilityDto);
    }

    @Get()
    @UseGuards(DiscordAuthGuard)
    findAll() {
        return this.facilityService.findAllWithGames();
    }

    @Get(':id')
    @UseGuards(DiscordAuthGuard)
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.facilityService.findWithGames(id);
    }

    @Delete(':id')
    @UseGuards(ReservationAdminGuard)
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.facilityService.remove(id.toString());
    }

    @Put(':id')
    @UseGuards(ReservationAdminGuard)
    update(@Param('id', ParseIntPipe) id: number, @Body() facilityDto: Facility) {
        return this.facilityService.update(id.toString(), facilityDto);
    }
}
