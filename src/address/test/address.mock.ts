import { AddressDto } from '../dto/address.dto';

export abstract class AddressMock {
  public static validAddress(zipcode: string): AddressDto {
    return <AddressDto>{
      zipCode: zipcode,
      street: 'street',
      neighborhood: 'neighborhood',
      city: 'city',
      state: 'state',
    };
  }
}
