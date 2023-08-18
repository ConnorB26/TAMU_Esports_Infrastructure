import { Controller, Post, Body } from '@nestjs/common';
import { SseService } from 'src/services/serverSentEvents.service';

@Controller('google-forms')
export class GoogleFormsController {
  constructor(private readonly sseService: SseService) {}

  @Post('submit')
  handleFormSubmit(@Body() data: any) {
    this.sseService.pushSseEvent(data);
    return { message: 'Event triggered' };
  }
}
