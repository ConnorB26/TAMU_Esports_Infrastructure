import { Body, Controller, Delete, Get, Param, Post, Put, ParseIntPipe, UseGuards } from '@nestjs/common';
import { Facility } from 'src/entities/facility.entity';
import { FacilityService } from 'src/services/facility.service';
import { ReservationAdminGuard } from 'src/guards/reservationAdmin.guard';

@Controller('facilities')
@UseGuards(ReservationAdminGuard)
export class FacilityController {
    constructor(private readonly facilityService: FacilityService) { }

    @Post()
    create(@Body() facilityDto: Facility) {
        return this.facilityService.save(facilityDto);
    }

    @Get()
    findAll() {
        return this.facilityService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.facilityService.findOne({ id });
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.facilityService.remove(id.toString());
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() facilityDto: Facility) {
        return this.facilityService.update(id.toString(), facilityDto);
    }
}
