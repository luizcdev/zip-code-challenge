import {
  HttpModuleOptions,
  HttpModuleOptionsFactory,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ViaCepClientConfig implements HttpModuleOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  createHttpOptions(): HttpModuleOptions {
    const baseUrl: string = this.configService.get<string>('VIACEP_URL');
    const timeout: number = +this.configService.get<string>('VIACEP_TIMEOUT');
    return {
      baseURL: baseUrl || 'https://viacep.com.br/ws',
      timeout: timeout || 5000,
    };
  }
}
