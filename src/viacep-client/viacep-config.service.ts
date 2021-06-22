import {
  HttpModuleOptions,
  HttpModuleOptionsFactory,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class ViaCepConfigService implements HttpModuleOptionsFactory {
  createHttpOptions(): HttpModuleOptions {
    return {
      baseURL: process.env.VIACEP_URL || 'https://viacep.com.br/ws',
      timeout: +process.env.VIACEP_TIMEOUT || 5000,
    };
  }
}
