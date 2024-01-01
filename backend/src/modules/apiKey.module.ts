import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiKey } from 'src/entities/apiKey.entity';
import { ApiKeyController } from 'src/controllers/apiKey.controller';
import { ApiKeyService } from 'src/services/apiKey.service';

@Module({
    imports: [TypeOrmModule.forFeature([ApiKey])],
    controllers: [ApiKeyController],
    providers: [ApiKeyService],
    exports: [ApiKeyService]
})
export class ApiKeyModule { }
