import { Body, Controller, Delete, Get, Param, Post, Put, ParseIntPipe } from '@nestjs/common';
import { RoleCommand } from 'src/entities/roleCommand.entity';
import { RoleCommandService } from 'src/services/roleCommand.service';

@Controller('role_commands')
export class RoleCommandController {
    constructor(private readonly roleCommandService: RoleCommandService) { }

    @Post()
    create(@Body() roleCommandDto: RoleCommand) {
        return this.roleCommandService.save(roleCommandDto);
    }

    @Get()
    findAll() {
        return this.roleCommandService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.roleCommandService.findOne(id);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.roleCommandService.remove(id);
    }

    @Delete(':role_id/:command_name')
    removeVals(@Param('role_id') role_id: string, @Param('command_name') command_name: string) {
        return this.roleCommandService.removeVals(role_id, command_name);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() roleCommandDto: RoleCommand) {
        return this.roleCommandService.update(id, roleCommandDto);
    }
}
