import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/core/auth/jwt/jwt-auth.guard';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { DocumentationTagsEnum } from 'src/core/util/documentation-tags.enum';

@ApiBearerAuth()
@ApiTags(DocumentationTagsEnum.AUTH)
@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOkResponse({ type: UserDto })
  @Post()
  async create(@Body() user: UserDto): Promise<UserDto> {
    const { username, password } = await this.userService.create(user);
    return <UserDto>{ username, password };
  }
}
