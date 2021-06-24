import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { UserModule } from '../../src/user/user.module';
import { JwtStrategy } from './jwt/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtConfigService } from './jwt/jwt-config.service';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      useClass: JwtConfigService,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
