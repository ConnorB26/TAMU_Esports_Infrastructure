import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ReservationUser } from 'src/entities/reservationUser.entity';
import { ReservationUserService } from 'src/services/reservationUser.service';

@Controller('reservation_user')
export class ReservationUserController {
    constructor(private readonly reservationUserService: ReservationUserService) { }

    @Post()
    create(@Body() reservationUserDto: Partial<ReservationUser>) {
        return this.reservationUserService.save(reservationUserDto);
    }

    @Get()
    findAll() {
        return this.reservationUserService.findAll();
    }

    @Get(':uin')
    findByUser(@Param('uin') uin: string) {
        return this.reservationUserService.findOne(uin);
    }

    @Delete(':uin')
    remove(@Param('uin') uin: string) {
        return this.reservationUserService.remove(uin);
    }

    @Put(':uin')
    update(@Param('uin') uin: string, @Body() reservationUserDto: Partial<ReservationUser>) {
        return this.reservationUserService.update(uin, reservationUserDto);
    }
}
