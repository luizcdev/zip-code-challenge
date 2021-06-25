import { Test, TestingModule } from '@nestjs/testing';
import { ViaCepClientService } from '../../viacep/viacep-client.service';
import {
  BadRequestException,
  HttpService,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { ViaCepMock } from './viacep.mock';
import { of, throwError } from 'rxjs';
import { mapByViaCepResponseDto } from '../mapper/viacep.mapper';

describe('ViaCep Service', () => {
  let service: ViaCepClientService;

  const httpMock = {
    get: jest.fn(),
  };

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [ViaCepClientService, HttpService],
    })
      .overrideProvider(HttpService)
      .useValue(httpMock)
      .compile();

    service = app.get<ViaCepClientService>(ViaCepClientService);
  });

  beforeEach(async () => {
    httpMock.get.mockReset();
  });

  describe('getByZipCode', () => {
    it('should return valid adress when client return status code 200 without error', async () => {
      const response = ViaCepMock.validResponse();
      httpMock.get.mockReturnValue(of(response));

      const result = await service.getByZipCode('99999999');

      expect(result).toEqual(mapByViaCepResponseDto(response));
    });

    it('should return null when client return status code 200 with error = true', async () => {
      const response = ViaCepMock.errorResponse();
      httpMock.get.mockReturnValue(of(response));

      const result = await service.getByZipCode('99999999');

      expect(result).toBeNull();
    });

    it('should throw InternalServerErrorException when client return status code different than 400', async () => {
      httpMock.get.mockImplementation(() => {
        return throwError(
          ViaCepMock.AxiosError(HttpStatus.INTERNAL_SERVER_ERROR),
        );
      });

      let result;
      try {
        await service.getByZipCode('99999999');
      } catch (e) {
        result = e;
      }

      expect(result).toBeInstanceOf(InternalServerErrorException);
      expect(result.message).toEqual('Via Cep return unexpected error');
    });

    it('should throw BadRequestException when client return status code 400', async () => {
      const zipCode = '99999999';
      httpMock.get.mockImplementation(() => {
        return throwError(ViaCepMock.AxiosError(HttpStatus.BAD_REQUEST));
      });

      let result;
      try {
        await service.getByZipCode(zipCode);
      } catch (e) {
        result = e;
      }

      expect(result).toBeInstanceOf(BadRequestException);
      expect(result.message).toEqual(
        `Via Cep return invalid format for ${zipCode}`,
      );
    });
  });
});
