import { Injectable } from '@nestjs/common';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
  createJwtOptions(): JwtModuleOptions {
    return {
      secret: process.env.TOKEN_SECRET,
      signOptions: { expiresIn: process.env.TOKEN_EXPIRES },
    };
  }
}
