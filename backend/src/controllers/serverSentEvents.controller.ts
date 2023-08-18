import { Controller, Sse } from '@nestjs/common';
import { Observable } from 'rxjs';
import { SseMessageEvent } from 'src/entities/SseMessageEvent.dto';
import { SseService } from 'src/services/serverSentEvents.service';

@Controller('sse')
export class SseController {
  constructor(private sseService: SseService) { }

  @Sse()
  sse(): Observable<SseMessageEvent> {
    return this.sseService.sseObservable;
  }
}