import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { Module } from '@nestjs/common';
import { AddressCacheModule } from 'src/address-cache/address-cache.module';
import { AddressApiModule } from 'src/address-api/address-api.module';

@Module({
  imports: [AddressApiModule, AddressCacheModule],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}
