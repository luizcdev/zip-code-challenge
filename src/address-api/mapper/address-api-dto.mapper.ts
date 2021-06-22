import { AddressDto } from 'src/common/dto/address.dto';
import { AxiosResponse } from 'axios';
import { ViaCepResponseDto } from '../dto/viacep-response.dto';

export function mapByViaCepResponseDto(origin: AxiosResponse): AddressDto {
  const CEP_SEPARATOR = '-';
  if (origin.data?.erro) return null;
  const response: ViaCepResponseDto = origin.data;
  return <AddressDto>{
    zipCode: response.cep?.replace(CEP_SEPARATOR, ''),
    street: response.logradouro,
    neighborhood: response.bairro,
    city: response.localidade,
    state: response.uf,
  };
}
