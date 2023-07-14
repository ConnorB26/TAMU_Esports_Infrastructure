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

    @Get('user/:discordId')
    findByUser(@Param('discordId') discordId: string) {
        return this.userCodeService.findByUser(discordId);
    }

    @Get('code/:code')
    findByCode(@Param('code') code: string) {
        return this.userCodeService.findByCode(code);
    }

    @Get(':discordId/:code')
    findOne(@Param('discordId') discordId: string, @Param('code') code: string) {
        return this.userCodeService.findOne(discordId, code);
    }

    @Delete(':discordId/:code')
    remove(@Param('discordId') discordId: string, @Param('code') code: string) {
        return this.userCodeService.remove(discordId, code);
    }

    @Delete(':discordId')
    removeUser(@Param('discordId') discordId: string) {
        return this.userCodeService.removeUser(discordId);
    }

    @Put(':discordId/:code')
    update(@Param('discordId') discordId: string, @Param('code') code: string, @Body() userCodeDto: UserCodeDto) {
        return this.userCodeService.update(discordId, code, userCodeDto);
    }
}
