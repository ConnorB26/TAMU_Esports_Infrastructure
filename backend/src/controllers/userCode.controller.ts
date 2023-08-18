import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserCodeDto } from 'src/entities/userCode.entity';
import { UserCodeService } from 'src/services/userCode.service';

@Controller('user_codes')
export class UserCodeController {
    constructor(private readonly userCodeService: UserCodeService) { }

    @Post()
    create(@Body() userCodeDto: UserCodeDto) {
        return this.userCodeService.save(userCodeDto);
    }

    @Get()
    findAll() {
        return this.userCodeService.findAll();
    }

    @Get('user/:uin')
    findByUser(@Param('uin') uin: string) {
        return this.userCodeService.findByUser(uin);
    }

    @Get('code/:code')
    findByCode(@Param('code') code: string) {
        return this.userCodeService.findByCode(code);
    }

    @Get(':uin/:code')
    findOne(@Param('uin') uin: string, @Param('code') code: string) {
        return this.userCodeService.findOne(uin, code);
    }

    @Delete(':uin/:code')
    remove(@Param('uin') uin: string, @Param('code') code: string) {
        return this.userCodeService.remove(uin, code);
    }

    @Delete(':uin')
    removeUser(@Param('uin') uin: string) {
        return this.userCodeService.removeUser(uin);
    }

    @Put(':uin/:code')
    update(@Param('uin') uin: string, @Param('code') code: string, @Body() userCodeDto: UserCodeDto) {
        return this.userCodeService.update(uin, code, userCodeDto);
    }
}
