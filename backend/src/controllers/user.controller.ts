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

    @Get(':discordId')
    findOne(@Param('discordId') discordId: string) {
        return this.userService.findOne(discordId);
    }

    @Delete(':discordId')
    remove(@Param('discordId') discordId: string) {
        return this.userService.remove(discordId);
    }

    @Put(':discordId')
    update(@Param('discordId') discordId: string, @Body() userDto: UserDto) {
        return this.userService.update(discordId, userDto);
    }
}
