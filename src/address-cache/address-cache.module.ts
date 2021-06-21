import { AddressCacheService } from './address-cache.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Address, AddressSchema } from './schema/address.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Address.name, schema: AddressSchema }]),
  ],
  controllers: [],
  providers: [AddressCacheService],
  exports: [AddressCacheService],
})
export class AddressCacheModule {}
