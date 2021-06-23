import {
  HttpService,
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { catchError, map } from 'rxjs/operators';
import { mapByViaCepResponseDto } from './mapper/address-api-dto.mapper';
import { AddressDto } from 'src/address/dto/address.dto';
import { HttpStatus } from '@nestjs/common';

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
