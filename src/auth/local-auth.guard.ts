import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import Constants from './util/constants';

@Injectable()
export class LocalAuthGuard extends AuthGuard(Constants.GUARD_TYPE) {}
