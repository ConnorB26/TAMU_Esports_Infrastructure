import { Injectable, ExecutionContext } from '@nestjs/common';
import { ReservationAuthGuard } from './reservationAuth.guard';

@Injectable()
export class ReservationAdminGuard extends ReservationAuthGuard {
    canActivate(context: ExecutionContext): boolean {
        if (!super.canActivate(context)) {
            return false;
        }
        const request = context.switchToHttp().getRequest();
        return request.user && request.user.is_admin;
    }
}
