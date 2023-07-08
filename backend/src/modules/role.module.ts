import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleService } from '../services/role.service';
import { RoleController } from '../controllers/role.controller';
import { Role } from '../entities/role.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Role])],
    controllers: [RoleController],
    providers: [RoleService],
    exports: [RoleService]
})
export class RoleModule { }