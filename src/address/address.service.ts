import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AddressApiService } from 'src/address-api/address-api.service';
import { AddressCacheService } from 'src/address-cache/address-cache.service';
import { AddressDto } from 'src/common/dto/address.dto';
import { getNextZipCode } from './util/address.util';

@Injectable()
export class AddressService {
  constructor(
    private readonly apiService: AddressApiService,
    private readonly cacheService: AddressCacheService,
  ) {}

  async findByZipCode(
    zipCode: string,
    searchKey?: string,
  ): Promise<AddressDto> {
    if (!searchKey) searchKey = zipCode;
    const address: AddressDto = await this.getAddress(zipCode);
    if (!address) {
      const nextZipCode: string = this.getAndValidateNextZipCode(zipCode);
      return this.findByZipCode(nextZipCode, searchKey);
    }

    address.searchKey = searchKey;
    this.cacheService.create(address);

    return address;
  }

  private async getAddress(zipCode: string): Promise<AddressDto> {
    return (
      (await this.cacheService.findBySeachKey(zipCode)) ||
      this.apiService.getByZipCode(zipCode)
    );
  }

  private getAndValidateNextZipCode(zipCode: string): string {
    const ZIPCODE_BREAK = '00000000';
    const nextZipCode: string = getNextZipCode(zipCode);
    if (nextZipCode == ZIPCODE_BREAK)
      throw new HttpException('zipCode not found', HttpStatus.NOT_FOUND);

    return nextZipCode;
  }
}
