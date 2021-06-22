import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { Module } from '@nestjs/common';
import { ViaCepApiModule } from 'src/viacep-client/viacep-client.module';
import { CacheModule } from 'src/cache/cache.module';

@Module({
  imports: [ViaCepApiModule, CacheModule],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}
