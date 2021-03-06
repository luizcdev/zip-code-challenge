import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../src/user/user.service';
import { User } from '../../src/user/schema/user.schema';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { ResponseTokenDto } from './dto/response-token.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(authCredentials: AuthCredentialsDto): Promise<ResponseTokenDto> {
    const { username, password } = authCredentials;

    const user: User = await this.userService.findByUsername(username);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!(await bcrypt.compare(password, user.password)))
      throw new UnauthorizedException('Invalid credentials');

    return <ResponseTokenDto>{
      accessToken: this.jwtService.sign({
        _id: user._id,
        username: user.username,
      }),
    };
  }
}
