import { Controller, Get, Param } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressDto } from 'src/common/dto/address.dto';
import { ZipCodePipe } from './pipes/zipcode.pipe';

@Controller('addresses')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get(':zipcode')
  async findByZipCode(
    @Param('zipcode', ZipCodePipe) zipCode: string,
  ): Promise<AddressDto> {
    return this.addressService.findByZipCode(zipCode);
  }
}
