import { User } from 'src/user/schema/user.schema';
import { UserRequestDto } from '../dto/user.dto';

export abstract class UserMock {
  public static validUser(): User {
    return <User>{
      _id: '1',
      username: 'usertest',
      password: 'passtest',
    };
  }

  public static validRequest(): UserRequestDto {
    return <UserRequestDto>{
      username: 'usertest',
      password: 'passtest',
    };
  }
}
