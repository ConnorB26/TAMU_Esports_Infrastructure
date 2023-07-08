import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './config';
import { DiscordSettingModule } from './modules/discordSettings.module';
import { DiscordBotInteractionModule } from './modules/discordBotInteraction.module';
import { TokenMiddleware } from 'src/middleware/token.middleware';
import { DiscordSetting } from './entities/discordSetting.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: config.DB_HOST,
      port: config.DB_PORT_NUMBER,
      username: config.DB_USERNAME,
      password: config.DB_PASSWORD,
      database: config.DB_DATABASE,
      entities: [DiscordSetting]
    }),
    DiscordSettingModule,
    DiscordBotInteractionModule
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