import { AddressModule } from './address/address.module';
import { Module } from '@nestjs/common';
import { DataBaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AddressModule,
    ConfigModule.forRoot({ isGlobal: true }),
    DataBaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
