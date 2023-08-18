import { Module } from '@nestjs/common';
import { GoogleFormsController } from 'src/controllers/googleForms.controller';
import { SseController } from 'src/controllers/serverSentEvents.controller';
import { SseService } from 'src/services/serverSentEvents.service';

@Module({
    providers: [SseService],
    controllers: [GoogleFormsController, SseController],
    exports: [SseService]
})
export class DiscordBotInteractionModule { }