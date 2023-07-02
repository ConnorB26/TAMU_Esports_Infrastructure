import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './config';
import { DatabaseTriggersService } from './triggers/db.triggers';
import { EventsGateway } from './websockets/events.gateway';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: config.DB_HOST,
      port: config.DB_PORT_NUMBER,
      username: config.DB_USERNAME,
      password: config.DB_PASSWORD,
      database: config.DB_DATABASE,
      //entities: [], // Include the paths to your entities here. Example: [__dirname + '/**/*.entity{.ts,.js}']
      //synchronize: true,
    })
  ],
  controllers: [],
  providers: [DatabaseTriggersService, EventsGateway],
})
export class AppModule {}
