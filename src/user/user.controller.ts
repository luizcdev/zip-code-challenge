import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../../src/auth/jwt/jwt-auth.guard';
import { UserRequestDto, UserResponseDto } from './dto/user.dto';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { DocumentationTagsEnum } from '../../src/core/util/documentation-tags.enum';

@ApiBearerAuth()
@ApiTags(DocumentationTagsEnum.AUTH)
@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOkResponse({ type: UserResponseDto })
  @Post()
  async create(@Body() request: UserRequestDto): Promise<UserResponseDto> {
    await this.userService.create(request);
    return <UserResponseDto>{
      message: `user ${request.username} created with success`,
    };
  }
}
