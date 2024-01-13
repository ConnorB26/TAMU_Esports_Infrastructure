import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './config';
import { DiscordSettingModule } from './modules/discordSetting.module';
import { TokenMiddleware } from 'src/middleware/token.middleware';
import { DiscordSetting } from './entities/discordSetting.entity';
import { ConfirmationCode } from './entities/confirmationCode.entity';
import { User } from './entities/user.entity';
import { UserCode } from './entities/userCode.entity';
import { ConfirmationCodeModule } from './modules/confirmationCode.module';
import { UserModule } from './modules/user.module';
import { UserCodeModule } from './modules/userCode.module';
import { RoleCommand } from './entities/roleCommand.entity';
import { RoleCommandModule } from './modules/roleCommand.module';
import { DiscordBotInteractionModule } from './modules/discordBotInteraction.module';
import { QOTDEntry } from './entities/qotdLeaderboard.entity';
import { QOTDLeaderboardModule } from './modules/qotdLeaderboard.module';
import { ConfirmationCodeController } from './controllers/confirmationCode.controller';
import { DiscordSettingController } from './controllers/discordSetting.controller';
import { UserController } from './controllers/user.controller';
import { UserCodeController } from './controllers/userCode.controller';
import { RoleCommandController } from './controllers/roleCommand.controller';
import { QOTDLeaderboardController } from './controllers/qotdLeaderboard.controller';
import { ApiKey } from './entities/apiKey.entity';
import { ApiKeyModule } from './modules/apiKey.module';
import { ApiKeyController } from './controllers/apiKey.controller';
import { ReservationAuthModule } from './modules/reservationAuth.module';
import { ReservationUserModule } from './modules/reservationUser.module';
import { ReservationUser } from './entities/reservationUser.entity';
import { ReservationUserController } from './controllers/reservationUser.controller';
import { Facility } from './entities/facility.entity';
import { FacilityGame } from './entities/facilityGame.entity';
import { Game } from './entities/game.entity';
import { Computer } from './entities/computer.entity';
import { Reservation } from './entities/reservation.entity';
import { ReservationComputer } from './entities/reservationComputer.entity';
import { ReservationParticipant } from './entities/reservationParticipant.entity';
import { ReservationCollectiveModule } from './modules/reservationCollective.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: config.DB_HOST,
            port: config.DB_PORT_NUMBER,
            username: config.DB_USERNAME,
            password: config.DB_PASSWORD,
            database: config.DB_DATABASE,
            schema: config.DB_SCHEMA,
            entities: [
                ConfirmationCode,
                DiscordSetting,
                User,
                UserCode,
                RoleCommand,
                QOTDEntry,
                ApiKey,
                ReservationUser,
                Facility,
                FacilityGame,
                Game,
                Computer,
                Reservation,
                ReservationComputer,
                ReservationParticipant
            ],
        }),
        ConfirmationCodeModule,
        DiscordSettingModule,
        UserModule,
        UserCodeModule,
        RoleCommandModule,
        DiscordBotInteractionModule,
        QOTDLeaderboardModule,
        ApiKeyModule,
        ReservationCollectiveModule
    ],
    controllers: [],
    providers: [],
})

export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(TokenMiddleware)
            .forRoutes(
                ConfirmationCodeController,
                DiscordSettingController,
                UserController,
                UserCodeController,
                RoleCommandController,
                QOTDLeaderboardController,
                ApiKeyController,
                ReservationUserController
            );
    }
}