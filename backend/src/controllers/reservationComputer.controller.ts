import { Body, Controller, Delete, Get, Param, Post, Put, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ReservationComputer } from 'src/entities/reservationComputer.entity';
import { ReservationComputerService } from 'src/services/reservationComputer.service';
import { ReservationAdminGuard } from 'src/guards/reservationAdmin.guard';

@Controller('reservation_computers')
@UseGuards(ReservationAdminGuard)
export class ReservationComputerController {
    constructor(private readonly reservationComputerService: ReservationComputerService) { }

    @Post()
    create(@Body() reservationComputerDto: ReservationComputer) {
        return this.reservationComputerService.save(reservationComputerDto);
    }

    @Get()
    findAll() {
        return this.reservationComputerService.findAll();
    }

    @Get(':reservationId/:computerId')
    findOne(@Param('reservationId', ParseIntPipe) reservationId: number, @Param('computerId', ParseIntPipe) computerId: number) {
        return this.reservationComputerService.findOne({ reservation_id: reservationId, computer_id: computerId });
    }

    @Delete(':reservationId/:computerId')
    remove(@Param('reservationId', ParseIntPipe) reservationId: number, @Param('computerId', ParseIntPipe) computerId: number) {
        return this.reservationComputerService.removeByCompositeKey(reservationId, computerId);
    }

    @Put(':reservationId/:computerId')
    update(@Param('reservationId', ParseIntPipe) reservationId: number, @Param('computerId', ParseIntPipe) computerId: number, @Body() reservationComputerDto: ReservationComputer) {
        return this.reservationComputerService.updateByCompositeKey(reservationId, computerId, reservationComputerDto);
    }
}
