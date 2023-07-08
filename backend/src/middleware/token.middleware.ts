import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { config } from 'src/config';

@Injectable()
export class TokenMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const token = req.headers.authorization?.split(' ')[1];

        if (token !== config.WEB_SOCKET_TOKEN) {
            res.status(401).json({ message: 'Invalid token' });
            return;
        }

        next();
    }
}