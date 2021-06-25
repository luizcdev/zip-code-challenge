import { Test, TestingModule } from '@nestjs/testing';
import { JwtStrategy } from '../jwt/jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { AuthMock } from './auth.mock';

describe('Auth Controller', () => {
  let strategy: JwtStrategy;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [JwtStrategy, ConfigService],
    })
      .overrideProvider(ConfigService)
      .useValue({
        get: jest.fn(() => 'token_test'),
      })
      .compile();

    strategy = app.get<JwtStrategy>(JwtStrategy);
  });

  describe('login', () => {
    it('should return object when receive payload', async () => {
      const payload = AuthMock.validUser();

      const result = await strategy.validate(payload);

      expect(result).toEqual({ id: payload._id, username: payload.username });
    });
  });
});
