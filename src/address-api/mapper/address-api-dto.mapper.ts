import { AddressDto } from 'src/common/dto/address.dto';
import { ViaCepResponseDto } from '../dto/viacep-response.dto';

export function mapByViaCepResponseDto(origin: ViaCepResponseDto): AddressDto {
  const CEP_SEPARATOR = '-';
  return <AddressDto>{
    zipCode: origin.cep?.replace(CEP_SEPARATOR, ''),
    street: origin.logradouro,
    neighborhood: origin.bairro,
    city: origin.localidade,
    state: origin.uf,
  };
}
