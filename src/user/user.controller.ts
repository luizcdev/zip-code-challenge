import { Body } from '@nestjs/common';
import { Controller, Post } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() user: UserDto) {
    const { username, password } = await this.userService.create(user);
    return <UserDto>{ username, password };
  }
}
