import { Body, Controller, Delete, Get, Param, Post, Put, ParseIntPipe } from '@nestjs/common';
import { DiscordSettingDto } from 'src/entities/discordSetting.entity';
import { DiscordSettingService } from 'src/services/discordSetting.service';

@Controller('discord_settings')
export class DiscordSettingController {
    constructor(private readonly discordSettingService: DiscordSettingService) { }

    @Post()
    create(@Body() discordSettingDto: DiscordSettingDto) {
        return this.discordSettingService.save(discordSettingDto);
    }

    @Get()
    findAll() {
        return this.discordSettingService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.discordSettingService.findOne({ id });
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.discordSettingService.remove(id.toString());
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() discordSettingDto: DiscordSettingDto) {
        return this.discordSettingService.update(id.toString(), discordSettingDto);
    }

    @Put('/name/:name')
    updateName(@Param('name') name: string, @Body() discordSettingDto: DiscordSettingDto) {
        return this.discordSettingService.updateByName(name, discordSettingDto);
    }
}
