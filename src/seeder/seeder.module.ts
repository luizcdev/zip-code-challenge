import { SeederService } from './seeder.service';
import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { LoggerModule } from 'src/core/logger/logger.module';

@Module({
  imports: [UserModule, LoggerModule],
  providers: [SeederService],
})
export class SeederModule {}
