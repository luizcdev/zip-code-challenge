import { CacheService } from './cache.service';
import { Module, CacheModule as NesJsCacheModule } from '@nestjs/common';
import { RedisConfigService } from './redis-config.service';

@Module({
  imports: [
    NesJsCacheModule.registerAsync({
      useClass: RedisConfigService,
    }),
  ],
  controllers: [],
  providers: [CacheService, RedisConfigService],
  exports: [CacheService],
})
export class CacheModule {}
