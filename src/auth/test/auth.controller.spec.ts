import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../../src/user/user.service';
import { AuthMock } from './auth.mock';
import { UnauthorizedException } from '@nestjs/common';

describe('Auth Controller', () => {
  let controller: AuthController;

  const userServiceMock = {
    findByUsernameAndPassword: jest.fn(),
  };

  const jwtServiceMock = {
    sign: jest.fn(),
  };

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, UserService, JwtService],
    })
      .overrideProvider(UserService)
      .useValue(userServiceMock)
      .overrideProvider(JwtService)
      .useValue(jwtServiceMock)
      .compile();

    controller = app.get<AuthController>(AuthController);
  });

  beforeEach(async () => {
    userServiceMock.findByUsernameAndPassword.mockReset();
    jwtServiceMock.sign.mockReset();
  });

  describe('login', () => {
    it('should return token when receive valid credentials from a valid user', async () => {
      const credentials = AuthMock.validCredentials();
      const user = AuthMock.validUser();
      const responseToken = AuthMock.validResponseToken();

      userServiceMock.findByUsernameAndPassword.mockReturnValue(user);
      jwtServiceMock.sign.mockReturnValue(responseToken.accessToken);
      const result = await controller.login(credentials);

      expect(result.accessToken).toEqual(responseToken.accessToken);
    });

    it('should throw UnauthorizedException receive credentials but not find the user', async () => {
      const credentials = AuthMock.validCredentials();

      userServiceMock.findByUsernameAndPassword.mockReturnValue(null);

      let result;
      try {
        await controller.login(credentials);
      } catch (e) {
        result = e;
      }

      expect(result).toBeInstanceOf(UnauthorizedException);
      expect(result.message).toEqual('Invalid credentials');
    });
  });
});
