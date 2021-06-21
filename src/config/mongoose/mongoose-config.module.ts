import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ViaCepClientModule } from 'src/clients/viacep/viacep-client.module';
import { MongooseConfigService } from './mongoose-config.service';

@Module({
  imports: [
    ViaCepClientModule,
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),
  ],
})
export class MongooseConfigModule {}
