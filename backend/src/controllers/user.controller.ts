import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserDto } from 'src/entities/user.entity';
import { UserService } from 'src/services/user.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    create(@Body() userDto: UserDto) {
        return this.userService.save(userDto);
    }

    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @Get(':uin')
    findOne(@Param('uin') uin: string) {
        return this.userService.findOne({ uin });
    }

    @Get('discord/:id')
    findOneDiscord(@Param('id') id: string) {
        return this.userService.findOneByDiscordId(id);
    }

    @Delete(':uin')
    remove(@Param('uin') uin: string) {
        return this.userService.remove(uin);
    }

    @Delete('discord/:id')
    removeDiscord(@Param('id') id: string) {
        return this.userService.removeByDiscordId(id);
    }

    @Put(':uin')
    update(@Param('uin') uin: string, @Body() userDto: UserDto) {
        return this.userService.update(uin, userDto);
    }

    @Put('discord/:id')
    updateDiscord(@Param('id') id: string, @Body() userDto: UserDto) {
        return this.userService.updateByDiscordId(id, userDto);
    }
}
