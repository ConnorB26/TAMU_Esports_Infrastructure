import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRoleService } from '../services/userRole.service';
import { UserRoleController } from '../controllers/userRole.controller';
import { UserRole } from '../entities/userRole.entity';

@Module({
    imports: [TypeOrmModule.forFeature([UserRole])],
    controllers: [UserRoleController],
    providers: [UserRoleService],
    exports: [UserRoleService]
})
export class UserRoleModule { }
