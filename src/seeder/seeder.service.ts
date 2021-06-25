import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserRequestDto } from 'src/user/dto/user.dto';
import { User } from 'src/user/schema/user.schema';
import { UserService } from '../../src/user/user.service';

@Injectable()
export class SeederService implements OnApplicationBootstrap {
  private readonly logger = new Logger(SeederService.name);

  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

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
      this.logger.error('error when execute seeder');
    }
  }
}
