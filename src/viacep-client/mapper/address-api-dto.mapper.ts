import { AddressDto } from 'src/common/dto/address.dto';
import { AxiosResponse } from 'axios';
import { ViaCepResponseDto } from '../dto/viacep-response.dto';

export function mapByViaCepResponseDto(origin: AxiosResponse): AddressDto {
  if (origin.data?.erro) return null;

  const response: ViaCepResponseDto = origin.data;
  return <AddressDto>{
    zipCode: response.cep,
    street: response.logradouro,
    neighborhood: response.bairro,
    city: response.localidade,
    state: response.uf,
  };
}
