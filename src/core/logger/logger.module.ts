import { CustomLoggerService } from './logger.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [CustomLoggerService],
  exports: [CustomLoggerService],
})
export class LoggerModule {}
