import { Request, Response, NextFunction } from 'express';
import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { CustomLoggerService } from '../logger/logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly customLoggerService: CustomLoggerService) {
    customLoggerService.setContext(LoggerMiddleware.name);
  }

  use(request: Request, response: Response, next: NextFunction): void {
    const { method, originalUrl } = request;

    response.on('finish', () => {
      const { statusCode } = response;
      this.customLoggerService.http(method, originalUrl, statusCode);
    });

    next();
  }
}
