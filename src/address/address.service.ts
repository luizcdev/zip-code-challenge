import { Injectable } from '@nestjs/common';
import { AddressApiService } from 'src/address-api/address-api.service';
import { AddressCacheService } from 'src/address-cache/address-cache.service';
import { AddressDto } from 'src/common/dto/address.dto';

@Injectable()
export class AddressService {
  constructor(
    private readonly apiService: AddressApiService,
    private readonly cacheService: AddressCacheService,
  ) {}

  async findByZipCode(zipCode: string): Promise<AddressDto> {
    let address: AddressDto = await this.cacheService.findByZipCode(zipCode);

    if (!address) address = await this.apiService.getAddressByZipCode(zipCode);

    this.cacheService.create(address);

    return address;
  }
}
