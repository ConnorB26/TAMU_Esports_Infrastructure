import { Injectable, NestMiddleware } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { Request, Response, NextFunction } from 'express';
import { ApiKeyService } from 'src/services/apiKey.service';

@Injectable()
export class TokenMiddleware implements NestMiddleware {
    private apiKeyService: ApiKeyService;

    constructor(private moduleRef: ModuleRef) { }

    async onModuleInit() {
        this.apiKeyService = this.moduleRef.get(ApiKeyService, { strict: false });
    }

    async use(req: Request, res: Response, next: NextFunction) {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'No API key provided' });
        }

        const isValid = await this.apiKeyService.validateApiKey(token);
        if (!isValid) {
            return res.status(401).json({ message: 'Invalid API key' });
        }

        next();
    }
}
