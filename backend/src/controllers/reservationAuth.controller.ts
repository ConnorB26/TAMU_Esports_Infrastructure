import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { config } from 'src/config';
import { ReservationAuthService } from 'src/services/reservationAuth.service';

@Controller('reservation_auth')
export class ReservationAuthController {
    constructor(private reservationAuthService: ReservationAuthService) { }

    @Get('discord/redirect')
    @UseGuards(AuthGuard('discord_reservation'))
    async discordAuthRedirect(@Req() req, @Res() res) {
        try {
            const user = await this.reservationAuthService.validateUser(req.user);
            const jwt = await this.reservationAuthService.login(user);
    
            res.redirect(`${config.DISCORD_SUCCESS_REDIRECT_URL}?token=${jwt.access_token}`);
        } catch (error) {
            res.redirect(config.DISCORD_FAILURE_REDIRECT_URL);
        }
    }
}
