import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/core/auth/jwt/jwt-auth.guard';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtGuard)
  @Post()
  async create(@Body() user: UserDto) {
    const { username, password } = await this.userService.create(user);
    return <UserDto>{ username, password };
  }
}
