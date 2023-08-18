import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiscordSettingService } from '../services/discordSetting.service';
import { DiscordSettingController } from '../controllers/discordSetting.controller';
import { DiscordSetting } from '../entities/discordSetting.entity';

@Module({
    imports: [TypeOrmModule.forFeature([DiscordSetting])],
    controllers: [DiscordSettingController],
    providers: [DiscordSettingService],
    exports: [DiscordSettingService]
})
export class DiscordSettingModule { }
