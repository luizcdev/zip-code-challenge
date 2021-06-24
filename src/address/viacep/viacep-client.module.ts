import { ViaCepClientService } from './viacep-client.service';
import { HttpModule, Module } from '@nestjs/common';
import { ViaCepClientConfig } from './viacep-client.config';

@Module({
  imports: [
    HttpModule.registerAsync({
      useClass: ViaCepClientConfig,
    }),
  ],
  controllers: [],
  providers: [ViaCepClientService],
  exports: [ViaCepClientService],
})
export class ViaCepClientModule {}
