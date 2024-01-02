import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ReservationUserService } from './reservationUser.service';
import { User } from 'src/entities/user.entity';

@Injectable()
export class ReservationAuthService {
    constructor(
        private jwtService: JwtService,
        private reservationUserService: ReservationUserService
    ) { }

    async validateUser(userInfo: User): Promise<any> {
        // Retrieve the user's information from the reservation_users table using their Discord ID
        let reservationUser;
        try {
            reservationUser = await this.reservationUserService.findOne(userInfo.uin);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new NotFoundException('User not authorized for the reservation system.');
            }
            throw error;
        }

        // Add the 'is_admin' property to the user object for JWT payload
        const user = {
            uin: reservationUser.uin,
            is_admin: reservationUser.is_admin
        };
        
        return user;
    }

    async login(user: any) {
        return {
            access_token: this.jwtService.sign(user),
        };
    }
}
