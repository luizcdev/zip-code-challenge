import { AddressModule } from './address/address.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DataBaseModule } from './database/database.module';

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
