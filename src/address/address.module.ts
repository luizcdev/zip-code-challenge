import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { Module } from '@nestjs/common';
import { CacheModule } from '../../src/core/cache/cache.module';
import { ViaCepClientModule } from './viacep/viacep-client.module';

@Module({
  imports: [ViaCepClientModule, CacheModule],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}
