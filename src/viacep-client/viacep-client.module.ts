import { ViaCepClientService } from './viacep-client.service';
import { HttpModule, Module } from '@nestjs/common';
import { ViaCepConfigService } from './viacep-config.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      useClass: ViaCepConfigService,
    }),
  ],
  controllers: [],
  providers: [ViaCepClientService],
  exports: [ViaCepClientService],
})
export class ViaCepApiModule {}
