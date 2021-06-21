import { AddressApiService } from './address-api.service';
import { HttpModule, Module } from '@nestjs/common';
import { ViaCepConfigService } from './viacep-config.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      useClass: ViaCepConfigService,
    }),
  ],
  controllers: [],
  providers: [AddressApiService],
  exports: [AddressApiService],
})
export class AddressApiModule {}
