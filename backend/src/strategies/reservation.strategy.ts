import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-discord';
import { config } from 'src/config';
import { UserService } from 'src/services/user.service';

@Injectable()
export class DiscordReservationStrategy extends PassportStrategy(Strategy, 'discord_reservation') {
    constructor(private userService: UserService) {
        super({
            clientID: config.DISCORD_CLIENT_ID,
            clientSecret: config.DISCORD_CLIENT_SECRET,
            callbackURL: config.DISCORD_CALLBACK_URL,
            scope: ['identify'],
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: any): Promise<any> {
        try {
            const user = await this.userService.findOneDiscord(profile.id);
            return { user, exists: true };
        } catch (error) {
            return { exists: false };
        }
    }

}
