import {
  LoginCommand,
  LoginResult,
  RegisterCommand,
  RegisterResult,
} from '@/modules/auth/commands';
import {
  LoginBodyDto,
  LoginResultDto,
  RegisterBodyDto,
  RegisterResultDto,
} from '@/modules/auth/dto';
import { BaseController } from '@/shared/base.controller';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController extends BaseController {
  @ApiOperation({
    summary: 'Rejestrowanie użytkownika',
    description: 'Metoda pozwala na utworzenie konta przez nowego użytkownika systemu.',
  })
  @ApiOkResponse({
    type: RegisterResultDto,
    description: 'Użytkownik został pomyślnie zarejestrowany',
  })
  @ApiBadRequestResponse({ description: 'Użytkownik o podanym adresie e-mail już istnieje' })
  @Post('/register')
  async register(@Body() user: RegisterBodyDto): Promise<RegisterResultDto> {
    const command = new RegisterCommand(user);
    const result = await this.executeCommand<RegisterResult>(command);

    return result.user;
  }

  @ApiOperation({
    summary: 'Logowanie użytkownika',
    description: 'Metoda pozwala na uwierzytelnienie się przez zarejestrowanego użytkownika.',
  })
  @ApiOkResponse({
    type: LoginResultDto,
    description: 'Użytkownik został pomyślnie zalogowany',
  })
  @ApiBadRequestResponse({ description: 'Nieprawidłowe dane logowania' })
  @Post('/login')
  async login(@Body() credentials: LoginBodyDto): Promise<LoginResultDto> {
    const command = new LoginCommand(credentials);
    const result = await this.executeCommand<LoginResult>(command);

    return result.result;
  }
}
