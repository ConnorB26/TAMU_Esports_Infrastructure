import { Controller, Get, Param, Req, Res, UseGuards } from '@nestjs/common';
import { config } from 'src/config';
import { ReservationAuthService } from 'src/services/reservationAuth.service';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

@Controller('reservation_auth')
export class ReservationAuthController {
    constructor(private reservationAuthService: ReservationAuthService, private jwtService: JwtService) { }

    @Get('discord/redirect')
    @UseGuards(AuthGuard('discord_reservation'))
    async discordAuthRedirect(@Req() req, @Res() res) {
        if (!req.user.exists) {
            return res.redirect(config.DISCORD_FAILURE_REDIRECT_URL);
        }

        try {
            const user = await this.reservationAuthService.validateUser(req.user.user);
            const jwt = await this.reservationAuthService.login(user);

            res.redirect(`${config.DISCORD_SUCCESS_REDIRECT_URL}&token=${jwt.access_token}`);
        } catch (error) {
            res.redirect(config.DISCORD_FAILURE_REDIRECT_URL);
        }
    }

    @Get('validate-token')
    validateTokenCookie(@Req() req) {
        try {
            const jwt = req.cookies['authToken'];
            const decoded = this.jwtService.verify(jwt);
            return { valid: true, decoded };
        } catch (error) {
            return { valid: false };
        }
    }

    @Get('validate-token/:token')
    validateToken(@Param('token') token: string) {
        try {
            const decoded = this.jwtService.verify(token);
            return { valid: true, decoded };
        } catch (error) {
            return { valid: false };
        }
    }
}
