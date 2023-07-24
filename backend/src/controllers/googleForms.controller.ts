import { Controller, Post, Body } from '@nestjs/common';
import { EventsGateway } from '../websockets/events.gateway';

@Controller('google-forms')
export class GoogleFormsController {
  constructor(private eventsGateway: EventsGateway) {}

  @Post('submit')
  handleFormSubmit(@Body() data: any) {
    this.eventsGateway.sendMessageToClients(data);
    return { message: 'Form data received and broadcasted' };
  }
}
