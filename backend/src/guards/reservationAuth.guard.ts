import { Injectable, ExecutionContext } from '@nestjs/common';
import { DiscordAuthGuard } from './discordAuth.guard';

@Injectable()
export class ReservationAuthGuard extends DiscordAuthGuard {
    canActivate(context: ExecutionContext): boolean {
        if (!super.canActivate(context)) {
            return false;
        }
        const request = context.switchToHttp().getRequest();
        return request.user && request.user.reservation_access;
    }
}
