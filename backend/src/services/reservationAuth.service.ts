import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ReservationUserService } from './reservationUser.service';
import { User } from 'src/entities/user.entity';
import { ReservationUser } from 'src/entities/reservationUser.entity';
import { DiscordUser } from 'src/entities/discordUser.entity';

@Injectable()
export class ReservationAuthService {
    constructor(
        private jwtService: JwtService,
        private reservationUserService: ReservationUserService
    ) { }

    async validateUser(userInfo: any): Promise<DiscordUser> {
        if (!userInfo.user.has_paid_dues) {
            throw new NotFoundException('User not authorized for the reservation system.');
        }

        let reservationUser: ReservationUser | null;
        try {
            reservationUser = await this.reservationUserService.findOne(userInfo.user.uin);
        } catch (error) {

        }

        const user: DiscordUser = {
            uin: userInfo.user.uin,
            reservation_access: !!reservationUser,
            is_admin: reservationUser && reservationUser.is_admin
        };

        return user;
    }

    async login(user: DiscordUser) {
        return {
            access_token: this.jwtService.sign(user),
        };
    }
}
