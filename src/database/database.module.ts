import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ViaCepClientModule } from 'src/clients/viacep/viacep-client.module';
import { DatabaseConfigService } from './database-config.service';

@Module({
  imports: [
    ViaCepClientModule,
    MongooseModule.forRootAsync({
      useClass: DatabaseConfigService,
    }),
  ],
})
export class DataBaseModule {}
