import { Controller, Get, Param } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressResponseDto } from '../common/dto/address-response.dto';
import { AddressDto } from 'src/common/dto/address.dto';
import { mapByAddressDto } from 'src/common/mapper/address-response-dto.mapper';

@Controller('addresses')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get(':zipcode')
  async findByZipCode(
    @Param('zipcode') zipCode: string,
  ): Promise<AddressResponseDto> {
    const address: AddressDto = await this.addressService.findByZipCode(
      zipCode,
    );
    return mapByAddressDto(address);
  }
}
