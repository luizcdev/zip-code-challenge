import { LoggerModule } from './core/logger/logger.module';
import { HealthController } from './health.controller';
import { AuthModule } from './auth/auth.module';
import { CacheModule } from './core/cache/cache.module';
import { AddressModule } from './address/address.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DataBaseModule } from './core/database/database.module';
import { UserModule } from './user/user.module';
import { TerminusModule } from '@nestjs/terminus';
import { SeederModule } from './seeder/seeder.module';
import { LoggerMiddleware } from './core/middleware/logger.middleware';

@Module({
  imports: [
    LoggerModule,
    AuthModule,
    CacheModule,
    UserModule,
    AddressModule,
    DataBaseModule,
    SeederModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TerminusModule,
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
