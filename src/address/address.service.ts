import { Injectable, NotFoundException } from '@nestjs/common';
import { ViaCepClientService } from 'src/viacep-client/viacep-client.service';
import { AddressDto } from 'src/core/common/dto/address.dto';
import { CacheService } from 'src/core/cache/cache.service';
import { getNextZipCode } from './util/address.util';

@Injectable()
export class AddressService {
  private readonly CACHE_PREFIX = 'ZIPCODE';

  constructor(
    private readonly apiService: ViaCepClientService,
    private readonly cacheService: CacheService<AddressDto>,
  ) {}

  async findByZipCode(zipCode: string, key?: string): Promise<AddressDto> {
    if (!key) key = zipCode;

    const address: AddressDto = await this.getAddress(zipCode);
    if (!address) {
      const nextZipCode: string = this.getAndValidateNextZipCode(zipCode);
      return this.findByZipCode(nextZipCode, key);
    }

    this.cacheService.set(this.CACHE_PREFIX, key, address);

    return address;
  }

  private async getAddress(zipCode: string): Promise<AddressDto> {
    return (
      (await this.cacheService.get(this.CACHE_PREFIX, zipCode)) ||
      this.apiService.getByZipCode(zipCode)
    );
  }

  private getAndValidateNextZipCode(zipCode: string): string {
    const ZIPCODE_BREAK = '00000000';

    const nextZipCode: string = getNextZipCode(zipCode);
    if (nextZipCode == ZIPCODE_BREAK)
      throw new NotFoundException(`zipCode ${zipCode} not found`);

    return nextZipCode;
  }
}
