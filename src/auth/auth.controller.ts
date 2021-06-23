import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import Constants from './util/constants';

@Controller()
export class AuthController {
  @UseGuards(AuthGuard(Constants.GUARD_TYPE))
  @Post('auth/login')
  async login(@Request() req) {
    return req.user;
  }
}
