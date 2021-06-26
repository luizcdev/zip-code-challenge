import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CustomLoggerService } from 'src/core/logger/logger.service';
import { UserRequestDto } from 'src/user/dto/user.dto';
import { User } from 'src/user/schema/user.schema';
import { UserService } from '../../src/user/user.service';

@Injectable()
export class SeederService implements OnApplicationBootstrap {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly logger: CustomLoggerService,
  ) {
    logger.setContext(SeederService.name);
  }

  async onApplicationBootstrap() {
    try {
      const username: string =
        this.configService.get<string>('DEFAULT_USERNAME');
      const password: string =
        this.configService.get<string>('DEFAULT_PASSWORD');

      const user: User = await this.userService.findByUsername(username);
      if (!user) {
        this.logger.log('creating default user');
        this.userService.create(<UserRequestDto>{ username, password });
      }
    } catch (e) {
      this.logger.error('error when execute seeder', e.stack);
    }
  }
}
