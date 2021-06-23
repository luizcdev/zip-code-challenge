import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { Module } from '@nestjs/common';
import { ViaCepApiModule } from 'src/address/viacep-client/viacep-client.module';
import { CacheModule } from 'src/core/cache/cache.module';

@Module({
  imports: [ViaCepApiModule, CacheModule],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}
