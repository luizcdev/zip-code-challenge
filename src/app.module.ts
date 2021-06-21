import { AddressModule } from './address/address.module';
import { Module } from '@nestjs/common';
import { MongooseConfigModule } from './config/mongoose/mongoose-config.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AddressModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseConfigModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
