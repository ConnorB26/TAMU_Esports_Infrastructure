import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './config';
import { DiscordSettingModule } from './modules/discordSettings.module';
import { DiscordBotInteractionModule } from './modules/discordBotInteraction.module';
import { TokenMiddleware } from 'src/middleware/token.middleware';
import { DiscordSetting } from './entities/discordSetting.entity';
import { ConfirmationCode } from './entities/confirmationCode.entity';
import { Role } from './entities/role.entity';
import { User } from './entities/user.entity';
import { UserCode } from './entities/userCode.entity';
import { UserRole } from './entities/userRole.entity';
import { ConfirmationCodeModule } from './modules/confirmationCode.module';
import { RoleModule } from './modules/role.module';
import { UserModule } from './modules/user.module';
import { UserCodeModule } from './modules/userCode.module';
import { UserRoleModule } from './modules/userRole.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: config.DB_HOST,
      port: config.DB_PORT_NUMBER,
      username: config.DB_USERNAME,
      password: config.DB_PASSWORD,
      database: config.DB_DATABASE,
      entities: [ConfirmationCode, DiscordSetting, Role, User, UserCode, UserRole]
    }),
    DiscordBotInteractionModule,
    ConfirmationCodeModule,
    DiscordSettingModule,
    RoleModule,
    UserModule,
    UserCodeModule,
    UserRoleModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TokenMiddleware)
      .forRoutes('*');
  }
}