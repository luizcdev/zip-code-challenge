import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { Module } from '@nestjs/common';
import { AddressApiModule } from 'src/address-api/address-api.module';
import { CacheModule } from 'src/cache/cache.module';

@Module({
  imports: [AddressApiModule, CacheModule],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}
