import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { config } from '../config';
import { DiscordReservationStrategy } from 'src/strategies/reservation.strategy';
import { ReservationAuthService } from 'src/services/reservationAuth.service';
import { ReservationAuthController } from 'src/controllers/reservationAuth.controller';
import { ReservationUserModule } from './reservationUser.module';
import { UserModule } from './user.module';

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: config.JWT_SECRET,
            signOptions: { expiresIn: '60m' },
        }),
        ReservationUserModule,
        UserModule
    ],
    providers: [ReservationAuthService, DiscordReservationStrategy],
    controllers: [ReservationAuthController],
})
export class ReservationAuthModule {}
