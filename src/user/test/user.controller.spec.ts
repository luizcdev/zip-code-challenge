import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { UserController } from '../user.controller';
import { UserMock } from './user.mock';

describe('Auth Controller', () => {
  let controller: UserController;

  const userServiceMock = {
    create: jest.fn(),
  };

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    })
      .overrideProvider(UserService)
      .useValue(userServiceMock)
      .compile();

    controller = app.get<UserController>(UserController);
  });

  beforeEach(async () => {
    userServiceMock.create.mockReset();
  });

  describe('create', () => {
    it('should return success message when save user', async () => {
      const user = UserMock.validUser();
      const request = UserMock.validRequest();

      userServiceMock.create.mockReturnValue(user);
      const result = await controller.create(request);

      expect(result).toEqual({
        message: `user ${user.username} created with success`,
      });
    });
  });
});
