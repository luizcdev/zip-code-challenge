import { HealthController } from './health.controller';
import { AuthModule } from './core/auth/auth.module';
import { CacheModule } from './core/cache/cache.module';
import { AddressModule } from './address/address.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DataBaseModule } from './core/database/database.module';
import { UserModule } from './user/user.module';
import { TerminusModule } from '@nestjs/terminus';

@Module({
  imports: [
    AuthModule,
    CacheModule,
    UserModule,
    AddressModule,
    DataBaseModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TerminusModule,
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
