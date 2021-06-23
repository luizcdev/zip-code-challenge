import { ApiProperty } from '@nestjs/swagger';

export class AddressDto {
  @ApiProperty()
  zipCode: string;

  @ApiProperty()
  street: string;

  @ApiProperty()
  neighborhood: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  state: string;
}
