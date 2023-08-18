export interface SseMessageEvent {
    data: any;
    id?: string;
    type?: string;
    retry?: number;
}  