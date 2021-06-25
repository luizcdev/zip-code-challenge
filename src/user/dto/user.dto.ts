import { ApiProperty } from '@nestjs/swagger';
export class UserRequestDto {
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
}

export class UserResponseDto {
  @ApiProperty()
  message: string;
}
