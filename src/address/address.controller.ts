import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressDto } from 'src/core/common/dto/address.dto';
import { ZipCodePipe } from './pipes/zipcode.pipe';
import { JwtGuard } from 'src/core/auth/jwt/jwt-auth.guard';

@Controller('addresses')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @UseGuards(JwtGuard)
  @Get(':zipcode')
  async findByZipCode(
    @Param('zipcode', ZipCodePipe) zipCode: string,
  ): Promise<AddressDto> {
    return this.addressService.findByZipCode(zipCode);
  }
}
