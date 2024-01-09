import { Body, Controller, Delete, Get, Param, Post, Put, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ReservationParticipant } from 'src/entities/reservationParticipant.entity';
import { ReservationParticipantService } from 'src/services/reservationParticipant.service';
import { ReservationAdminGuard } from 'src/guards/reservationAdmin.guard';

@Controller('reservation_participants')
@UseGuards(ReservationAdminGuard)
export class ReservationParticipantController {
    constructor(private readonly reservationParticipantService: ReservationParticipantService) { }

    @Post()
    create(@Body() reservationParticipantDto: ReservationParticipant) {
        return this.reservationParticipantService.save(reservationParticipantDto);
    }

    @Get()
    findAll() {
        return this.reservationParticipantService.findAll();
    }

    @Get(':reservationId/:uin')
    findOne(@Param('reservationId', ParseIntPipe) reservationId: number, @Param('uin') uin: string) {
        return this.reservationParticipantService.findOne({ reservation_id: reservationId, uin });
    }

    @Delete(':reservationId/:uin')
    remove(@Param('reservationId', ParseIntPipe) reservationId: number, @Param('uin') uin: string) {
        return this.reservationParticipantService.removeByCompositeKey(reservationId, uin);
    }

    @Put(':reservationId/:uin')
    update(@Param('reservationId', ParseIntPipe) reservationId: number, @Param('uin') uin: string, @Body() reservationParticipantDto: ReservationParticipant) {
        return this.reservationParticipantService.updateByCompositeKey(reservationId, uin, reservationParticipantDto);
    }
}
