import { RedisConfigService } from './cache/redis-config.service';
import { CacheModule } from './cache/cache.module';
import { AddressModule } from './address/address.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DataBaseModule } from './database/database.module';

@Module({
  imports: [
    CacheModule,
    AddressModule,
    ConfigModule.forRoot({ isGlobal: true }),
    DataBaseModule,
  ],
  controllers: [],
  providers: [RedisConfigService],
})
export class AppModule {}
