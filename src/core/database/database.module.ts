import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseConfig } from './database.config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: DatabaseConfig,
    }),
  ],
})
export class DataBaseModule {}
