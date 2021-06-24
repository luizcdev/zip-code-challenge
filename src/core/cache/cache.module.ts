import { CacheService } from './cache.service';
import { Module, CacheModule as NesJsCacheModule } from '@nestjs/common';
import { RedisConfig } from './redis.config';

@Module({
  imports: [
    NesJsCacheModule.registerAsync({
      useClass: RedisConfig,
    }),
  ],
  controllers: [],
  providers: [CacheService, RedisConfig],
  exports: [CacheService],
})
export class CacheModule {}
