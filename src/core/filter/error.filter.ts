import {
  ExceptionFilter,
  Catch,
  HttpException,
  HttpStatus,
  ArgumentsHost,
} from '@nestjs/common';
import { CustomLoggerService } from '../logger/logger.service';

@Catch()
export class ErrorFilter implements ExceptionFilter {
  constructor(private readonly customLoggerService: CustomLoggerService) {
    customLoggerService.setContext(ErrorFilter.name);
  }
  catch(exception: Error, host: ArgumentsHost) {
    this.customLoggerService.error(exception.message, exception.stack);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(status).json({
      message: exception.message,
    });
  }
}
