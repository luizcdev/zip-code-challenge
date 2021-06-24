import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../src/user/schema/user.schema';
import { UserService } from '../../src/user/user.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { ResponseTokenDto } from './dto/response-token.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(authCredentials: AuthCredentialsDto): Promise<ResponseTokenDto> {
    const { username, password } = authCredentials;

    const user: User = await this.userService.findByUsernameAndPassword(
      username,
      password,
    );

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return <ResponseTokenDto>{
      accessToken: this.jwtService.sign({
        _id: user._id,
        username: user.username,
      }),
    };
  }
}
