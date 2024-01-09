import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, Req, BadRequestException } from '@nestjs/common';
import { ReservationService } from 'src/services/reservation.service';
import { ReservationAuthGuard } from 'src/guards/reservationAuth.guard';
import { ReservationAdminGuard } from 'src/guards/reservationAdmin.guard';
import { ReservationDto } from 'src/entities/reservation.entity';

@Controller('reservations')
export class ReservationController {
    constructor(
        private readonly reservationService: ReservationService
    ) { }

    @Post()
    @UseGuards(ReservationAuthGuard)
    create(@Body() reservationDto: ReservationDto, @Req() req) {
        return this.reservationService.createReservation(reservationDto, req.user.uin);
    }

    @Put(':id')
    @UseGuards(ReservationAuthGuard)
    update(@Param('id') id: number, @Body() reservationDto: ReservationDto, @Req() req) {
        return this.reservationService.updateReservation(id, reservationDto, req.user.uin);
    }

    @Delete(':id')
    @UseGuards(ReservationAuthGuard)
    remove(@Param('id') id: number, @Req() req) {
        return this.reservationService.deleteReservation(id, req.user.uin);
    }

    @Get()
    @UseGuards(ReservationAdminGuard)
    findAll() {
        return this.reservationService.findAll();
    }

    @Get(':id')
    @UseGuards(ReservationAdminGuard)
    findOne(@Param('id') id: number) {
        return this.reservationService.findOne({ id });
    }

    @Get('user')
    @UseGuards(ReservationAuthGuard)
    findAllUserReservations(@Req() req) {
        return this.reservationService.findUserReservations(req.user.uin);
    }
}
