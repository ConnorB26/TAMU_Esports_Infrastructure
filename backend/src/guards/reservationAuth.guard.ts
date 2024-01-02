import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { config } from 'src/config';

@Injectable()
export class ReservationAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        try {
            const jwt = request.cookies['authToken'];
            const payload = this.jwtService.verify(jwt);
            request.user = payload;
            return true;
        } catch (error) {
            return false;
        }
    }
}
