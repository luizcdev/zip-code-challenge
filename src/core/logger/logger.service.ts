import { Injectable, Scope, Logger } from '@nestjs/common';
import { HttpLogDto, SimpleLogDto } from './dto/logger.dto';
import { ElasticSearchService } from './elasticsearch.service';

@Injectable({ scope: Scope.TRANSIENT })
export class CustomLoggerService extends Logger {
  constructor(private readonly elasticSearchService: ElasticSearchService) {
    super();
  }

  log(message: string) {
    super.log(message);

    this.elasticSearchService.log(
      new SimpleLogDto('log', this.context, message),
    );
  }

  error(message: string, trace: string) {
    super.error(message, trace);

    this.elasticSearchService.log(
      new SimpleLogDto('error', this.context, message, trace),
    );
  }

  http(method: string, originalUrl: string, statusCode: number) {
    const httpLogDto: HttpLogDto = new HttpLogDto(
      this.context,
      method,
      originalUrl,
      statusCode,
    );

    super.log(httpLogDto.message);
    this.elasticSearchService.log(httpLogDto);
  }
}
