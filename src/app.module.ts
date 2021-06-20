import { Module } from '@nestjs/common';
import { MongooseConfigModule } from './config/mongoose/mongoose.config.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), MongooseConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
