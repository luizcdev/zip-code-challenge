import { CustomLoggerService } from './logger.service';
import { Module } from '@nestjs/common';
import { ElasticSearchService } from './elasticsearch.service';

@Module({
  providers: [CustomLoggerService, ElasticSearchService],
  exports: [CustomLoggerService],
})
export class LoggerModule {}
