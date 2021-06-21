import { HttpService, Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { mapByViaCepResponseDto } from './mapper/address-api-dto.mapper';
import { AddressDto } from 'src/common/dto/address.dto';

@Injectable()
export class AddressApiService {
  constructor(private readonly httpService: HttpService) {}

  async getAddressByZipCode(zipCode: string): Promise<AddressDto> {
    return this.httpService
      .get(`${zipCode}/json/`)
      .pipe(map((response) => mapByViaCepResponseDto(response.data)))
      .toPromise();
  }
}
