import { Body, Controller, Delete, Get, Param, Post, Put, ParseIntPipe } from '@nestjs/common';
import { ApiKey } from 'src/entities/apiKey.entity';
import { ApiKeyService } from 'src/services/apiKey.service';

@Controller('api_keys')
export class ApiKeyController {
    constructor(private readonly apiKeyService: ApiKeyService) { }

    @Post()
    create(@Body() apiKeyDto: ApiKey) {
        return this.apiKeyService.save(apiKeyDto);
    }

    @Get()
    findAll() {
        return this.apiKeyService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.apiKeyService.findOne(id);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.apiKeyService.remove(id);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() apiKeyDto: ApiKey) {
        return this.apiKeyService.update(id, apiKeyDto);
    }
}
