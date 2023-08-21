import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';
import { SseMessageEvent } from 'src/entities/SseMessageEvent.dto';

@Injectable()
export class SseService {
  private sseSubject = new Subject<SseMessageEvent>();

  // Call this method to push new events
  pushSseEvent(data: any) {
    this.sseSubject.next({ data });
  }

  // The SSE Controller will subscribe to this Observable
  get sseObservable() {
    return this.sseSubject.asObservable();
  }
}