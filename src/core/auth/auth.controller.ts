import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { ResponseTokenDto } from './dto/response-token.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { DocumentationTagsEnum } from '../util/documentation-tags.enum';
@ApiTags(DocumentationTagsEnum.AUTH)
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse({ type: ResponseTokenDto })
  @Post('auth/login')
  async login(
    @Body() authCredentials: AuthCredentialsDto,
  ): Promise<ResponseTokenDto> {
    return this.authService.login(authCredentials);
  }
}
