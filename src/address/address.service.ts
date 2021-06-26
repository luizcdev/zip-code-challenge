import { Injectable, NotFoundException } from '@nestjs/common';
import { AddressDto } from '../../src/address/dto/address.dto';
import { CacheService } from '../../src/core/cache/cache.service';
import { getNextZipCode } from './util/address.util';
import { ViaCepClientService } from './viacep/viacep-client.service';

@Injectable()
export class AddressService {
  private readonly CACHE_PREFIX = 'ZIPCODE';

  constructor(
    private readonly apiService: ViaCepClientService,
    private readonly cacheService: CacheService<AddressDto>,
  ) {}

  async findByZipCode(zipCode: string, key?: string): Promise<AddressDto> {
    if (!key) key = zipCode;

    const address: AddressDto =
      (await this.cacheService.get(this.CACHE_PREFIX, zipCode)) ||
      (await this.requestAddressToClient(zipCode, key));

    if (!address) {
      const nextZipCode: string = this.getAndValidateNextZipCode(zipCode, key);
      return this.findByZipCode(nextZipCode, key);
    }

    return address;
  }

  private async requestAddressToClient(
    zipCode: string,
    key: string,
  ): Promise<AddressDto> {
    const address: AddressDto = await this.apiService.getByZipCode(zipCode);
    if (address) this.cacheService.set(this.CACHE_PREFIX, key, address);
    return address;
  }

  private getAndValidateNextZipCode(zipCode: string, key: string): string {
    const ZIPCODE_BREAK = '00000000';

    const nextZipCode: string = getNextZipCode(zipCode);
    if (nextZipCode == ZIPCODE_BREAK)
      throw new NotFoundException(`zipCode ${key} not found`);

    return nextZipCode;
  }
}
