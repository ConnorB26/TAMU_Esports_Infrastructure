import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleCommand } from 'src/entities/roleCommand.entity';
import { RoleCommandController } from 'src/controllers/roleCommand.controller';
import { RoleCommandService } from 'src/services/roleCommand.service';

@Module({
    imports: [TypeOrmModule.forFeature([RoleCommand])],
    controllers: [RoleCommandController],
    providers: [RoleCommandService],
    exports: [RoleCommandService]
})
export class RoleCommandModule { }
