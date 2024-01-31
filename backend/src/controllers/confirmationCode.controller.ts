import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ConfirmationCodeDto } from 'src/entities/confirmationCode.entity';
import { ConfirmationCodeService } from 'src/services/confirmationCode.service';

@Controller('confirmation_codes')
export class ConfirmationCodeController {
    constructor(private readonly confirmationCodeService: ConfirmationCodeService) { }

    @Post()
    create(@Body() confirmationCodeDto: ConfirmationCodeDto) {
        return this.confirmationCodeService.save(confirmationCodeDto);
    }

    @Get()
    findAll() {
        return this.confirmationCodeService.findAll();
    }

    @Get(':code')
    findOne(@Param('code') code: string) {
        return this.confirmationCodeService.findOne(code);
    }

    @Delete('reset')
    removeAll() {
        return this.confirmationCodeService.removeAll();
    }

    @Delete(':code')
    remove(@Param('code') code: string) {
        return this.confirmationCodeService.remove(code);
    }

    @Put(':code')
    update(@Param('code') code: string, @Body() confirmationCodeDto: ConfirmationCodeDto) {
        return this.confirmationCodeService.update(code, confirmationCodeDto);
    }
}
