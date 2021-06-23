import { AuthModule } from './core/auth/auth.module';
import { CacheModule } from './core/cache/cache.module';
import { AddressModule } from './address/address.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DataBaseModule } from './core/database/database.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    AuthModule,
    CacheModule,
    UserModule,
    AddressModule,
    DataBaseModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
