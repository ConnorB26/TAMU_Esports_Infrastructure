import { Module } from '@nestjs/common';
import { EventsGateway } from '../websockets/events.gateway';
import { GoogleFormsController } from 'src/controllers/googleForms.controller';

@Module({
    providers: [EventsGateway],
    controllers: [GoogleFormsController],
    exports: [EventsGateway]
})
export class DiscordBotInteractionModule { }