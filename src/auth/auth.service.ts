import { Injectable } from '@nestjs/common';
import { User } from 'src/user/schema/user.schema';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async getUser(username: string, password: string): Promise<User> {
    return this.userService.findByUsernameAndPassword(username, password);
  }
}
