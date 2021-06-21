import { HttpService, Injectable } from '@nestjs/common';
import { ViaCepResponseDto } from './dto/viacep-response.dto';
import { map } from 'rxjs/operators';

@Injectable()
export class ViaCepClientService {
  constructor(private readonly httpService: HttpService) {}

  async getAddressByZipCode(zipCode: string): Promise<ViaCepResponseDto> {
    return this.httpService
      .get(`${zipCode}/json/`)
      .pipe(map((response) => response.data))
      .toPromise();
  }
}
