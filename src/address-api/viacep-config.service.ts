import {
  HttpModuleOptions,
  HttpModuleOptionsFactory,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ViaCepConfigService implements HttpModuleOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  private readonly baseURL: string =
    this.configService.get<string>('VIACEP_URL');
  private readonly timeout: string =
    this.configService.get<string>('VIACEP_TIMEOUT');

  createHttpOptions(): HttpModuleOptions {
    return {
      baseURL: this.baseURL || 'https://viacep.com.br/ws',
      timeout: +this.timeout || 5000,
    };
  }
}
