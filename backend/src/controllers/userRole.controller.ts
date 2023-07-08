import { Body, Controller, Delete, Get, Param, Post, Put, ParseIntPipe } from '@nestjs/common';
import { UserRoleDto } from 'src/entities/userRole.entity';
import { UserRoleService } from 'src/services/userRole.service';

@Controller('user_roles')
export class UserRoleController {
    constructor(private readonly userRoleService: UserRoleService) { }

    @Post()
    create(@Body() userRoleDto: UserRoleDto) {
        return this.userRoleService.save(userRoleDto);
    }

    @Get()
    findAll() {
        return this.userRoleService.findAll();
    }

    @Get(':discordId/:roleId')
    findOne(@Param('discordId') discordId: string, @Param('roleId', ParseIntPipe) roleId: number) {
        return this.userRoleService.findOne(discordId, roleId);
    }

    @Delete(':discordId/:roleId')
    remove(@Param('discordId') discordId: string, @Param('roleId', ParseIntPipe) roleId: number) {
        return this.userRoleService.remove(discordId, roleId);
    }

    @Put(':discordId/:roleId')
    update(@Param('discordId') discordId: string, @Param('roleId', ParseIntPipe) roleId: number, @Body() userRoleDto: UserRoleDto) {
        return this.userRoleService.update(discordId, roleId, userRoleDto);
    }
}
