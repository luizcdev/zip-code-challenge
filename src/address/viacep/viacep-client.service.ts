import {
  HttpService,
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  HttpStatus,
} from '@nestjs/common';
import { catchError, map } from 'rxjs/operators';
import { AddressDto } from '../dto/address.dto';
import { mapByViaCepResponseDto } from './mapper/viacep.mapper';

@Injectable()
export class ViaCepClientService {
  constructor(private readonly httpService: HttpService) {}

  async getByZipCode(zipCode: string): Promise<AddressDto> {
    return this.httpService
      .get(`${zipCode}/json/`)
      .pipe(
        map((response) => mapByViaCepResponseDto(response)),
        catchError((error) => {
          if (error.response.status == HttpStatus.BAD_REQUEST) {
            throw new BadRequestException(
              `Via Cep return invalid format for ${zipCode}`,
            );
          }

          throw new InternalServerErrorException(
            'Via Cep return unexpected error',
          );
        }),
      )
      .toPromise();
  }
}
