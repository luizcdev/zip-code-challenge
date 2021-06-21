import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Address, AddressSchema } from './schema/address.schema';
import { ViaCepClientModule } from 'src/clients/viacep/viacep-client.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Address.name, schema: AddressSchema }]),
    ViaCepClientModule,
  ],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}
