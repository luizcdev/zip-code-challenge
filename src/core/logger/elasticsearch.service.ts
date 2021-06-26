import { Injectable } from '@nestjs/common';
import { Client } from '@elastic/elasticsearch';
import { ConfigService } from '@nestjs/config';
import { HttpLogDto, SimpleLogDto } from './dto/logger.dto';

@Injectable()
export class ElasticSearchService {
  private readonly client: Client;
  private index: string;

  constructor(private readonly configService: ConfigService) {
    const host: string = configService.get<string>('ELASTICSEARCH_HOST');
    const port: string = configService.get<string>('ELASTICSEARCH_PORT');

    this.index = configService.get<string>('ELASTICSEARCH_INDEX');
    this.client = new Client({ node: `http://${host}:${port}` });
  }

  log(body: SimpleLogDto | HttpLogDto) {
    this.client.index({
      index: this.index,
      body,
    });
  }
}
