import {
  Injectable,
  CacheOptionsFactory,
  CacheModuleOptions,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';

@Injectable()
export class RedisConfig implements CacheOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  createCacheOptions(): CacheModuleOptions {
    return {
      store: redisStore,
      host: this.configService.get<string>('REDIS_HOST'),
      port: this.configService.get<string>('REDIS_PORT'),
      ttl: +this.configService.get<string>('REDIS_TTL'),
    };
  }
}
