import { Module } from '@nestjs/common';
import { DatabaseTriggersService } from '../triggers/db.triggers';
import { EventsGateway } from '../websockets/events.gateway';

@Module({
    providers: [DatabaseTriggersService, EventsGateway],
    exports: [DatabaseTriggersService, EventsGateway]
})
export class DiscordBotInteractionModule { }