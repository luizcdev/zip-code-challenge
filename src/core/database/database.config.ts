import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MongooseOptionsFactory,
  MongooseModuleOptions,
} from '@nestjs/mongoose';

@Injectable()
export class DatabaseConfig implements MongooseOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  createMongooseOptions(): MongooseModuleOptions {
    const host = this.configService.get<string>('MONGODB_HOST');
    const port = this.configService.get<string>('MONGODB_PORT');
    const username = this.configService.get<string>('MONGODB_USERNAME');
    const password = this.configService.get<string>('MONGODB_PASSWORD');

    return {
      uri: `mongodb://${username}:${password}@${host}:${port}/?authSource=admin`,
      dbName: 'zipcode',
      useCreateIndex: true,
    };
  }
}
