import { Body, Controller, Delete, Get, Param, Post, Put, ParseIntPipe, UseGuards } from '@nestjs/common';
import { Computer } from 'src/entities/computer.entity';
import { ComputerService } from 'src/services/computer.service';
import { ReservationAdminGuard } from 'src/guards/reservationAdmin.guard';

@Controller('computers')
@UseGuards(ReservationAdminGuard)
export class ComputerController {
    constructor(private readonly computerService: ComputerService) { }

    @Post()
    create(@Body() computerDto: Computer) {
        return this.computerService.save(computerDto);
    }

    @Get()
    findAll() {
        return this.computerService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.computerService.findOne({ id });
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.computerService.remove(id.toString());
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() computerDto: Computer) {
        return this.computerService.update(id.toString(), computerDto);
    }
}
