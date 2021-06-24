import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressDto } from '../../src/address/dto/address.dto';
import { ZipCodePipe } from './pipe/zipcode.pipe';
import { JwtGuard } from '../../src/auth/jwt/jwt-auth.guard';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { DocumentationTagsEnum } from '../../src/core/util/documentation-tags.enum';
@ApiBearerAuth()
@ApiTags(DocumentationTagsEnum.ADDRESS)
@UseGuards(JwtGuard)
@Controller('addresses')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @ApiOkResponse({ type: AddressDto })
  @Get(':zipcode')
  async findByZipCode(
    @Param('zipcode', ZipCodePipe) zipCode: string,
  ): Promise<AddressDto> {
    return this.addressService.findByZipCode(zipCode);
  }
}
