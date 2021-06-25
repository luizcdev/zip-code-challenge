import { ViaCepResponseDto } from '../dto/viacep-response.dto';
import { AxiosResponse, AxiosError } from 'axios';
import { HttpStatus } from '@nestjs/common';

export abstract class ViaCepMock {
  public static validResponse(): AxiosResponse<ViaCepResponseDto> {
    return <AxiosResponse<ViaCepResponseDto>>{
      status: 200,
      data: <ViaCepResponseDto>{
        cep: 'cep',
        logradouro: 'logradouro',
        bairro: 'bairro',
        localidade: 'localidade',
        uf: 'uf',
      },
    };
  }

  public static errorResponse(): AxiosResponse<ViaCepResponseDto> {
    return <AxiosResponse>{
      status: 200,
      data: { erro: true },
    };
  }

  public static AxiosError(httpStatus: HttpStatus): AxiosError {
    return <AxiosError>{
      config: null,
      code: null,
      request: null,
      response: { status: httpStatus },
    };
  }
}
