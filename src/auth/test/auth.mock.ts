import { User } from 'src/user/schema/user.schema';
import { AuthCredentialsDto } from '../dto/auth-credential.dto';
import { ResponseTokenDto } from '../dto/response-token.dto';

export abstract class AuthMock {
  public static validCredentials(): AuthCredentialsDto {
    return <AuthCredentialsDto>{
      username: 'usertest',
      password: 'passtest',
    };
  }

  public static validResponseToken(): ResponseTokenDto {
    return <ResponseTokenDto>{
      accessToken: 'token_test',
    };
  }

  public static validUser(): User {
    return <User>{
      _id: '1',
      username: 'usertest',
      password: 'passtest',
    };
  }
}
