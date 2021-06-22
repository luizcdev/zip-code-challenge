import {
  Injectable,
  CacheOptionsFactory,
  CacheModuleOptions,
} from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';

@Injectable()
export class RedisConfigService implements CacheOptionsFactory {
  createCacheOptions(): CacheModuleOptions {
    return {
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      ttl: +process.env.REDIS_TTL,
    };
  }
}
