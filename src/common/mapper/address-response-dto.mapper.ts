import { AddressResponseDto } from '../dto/address-response.dto';
import { AddressDto } from '../dto/address.dto';

export function mapByAddressDto(origin: AddressDto): AddressResponseDto {
  return <AddressResponseDto>{
    street: origin.street,
    neighborhood: origin.neighborhood,
    city: origin.city,
    state: origin.state,
  };
}
