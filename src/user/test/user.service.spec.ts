import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { UserService } from '../user.service';
import { UserMock } from './user.mock';
import { User } from '../schema/user.schema';
import { UserModule } from '../user.module';
import { BadRequestException } from '@nestjs/common';

describe('Auth Controller', () => {
  let service: UserService;

  const userModelMock = {
    findOne: jest.fn(),
    create: jest.fn(),
  };

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
    })
      .overrideProvider(getModelToken(User.name))
      .useValue(userModelMock)
      .compile();

    service = app.get<UserService>(UserService);
  });

  beforeEach(async () => {
    userModelMock.findOne.mockReset();
    userModelMock.create.mockReset();
  });

  describe('findOne', () => {
    it('should return user when find one', async () => {
      const user = UserMock.validUser();
      const request = UserMock.validRequest();
      userModelMock.findOne.mockReturnValueOnce({ exec: () => user });
      const result = await service.findByUsernameAndPassword(
        request.username,
        request.password,
      );

      expect(result).toEqual(user);
    });
  });

  describe('create', () => {
    it('should return user when receive a valid user', async () => {
      const user = UserMock.validUser();
      const request = UserMock.validRequest();
      userModelMock.findOne.mockReturnValueOnce({ exec: () => null });
      userModelMock.create.mockReturnValueOnce(user);
      const result = await service.create(request);

      expect(result).toEqual(user);
    });

    it('should throw BadRequestException when user already exists', async () => {
      const user = UserMock.validUser();
      const request = UserMock.validRequest();
      userModelMock.findOne.mockReturnValueOnce({ exec: () => user });

      let result;
      try {
        await service.create(request);
      } catch (e) {
        result = e;
      }

      expect(result).toBeInstanceOf(BadRequestException);
      expect(result.message).toEqual('Username already exists');
    });
  });
});
