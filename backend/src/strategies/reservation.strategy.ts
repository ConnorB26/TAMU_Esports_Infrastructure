import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-discord';
import { config } from 'src/config';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/services/user.service';

@Injectable()
export class DiscordReservationStrategy extends PassportStrategy(Strategy, 'discord_reservation') {
    constructor(private userService: UserService) {
        super({
            clientID: config.DISCORD_CLIENT_ID,
            clientSecret: config.DISCORD_TOKEN,
            callbackURL: config.DISCORD_CALLBACK_URL,
            scope: ['identify'],
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: any): Promise<User> {
        return await this.userService.findOneDiscord(profile.id);
    }
}
