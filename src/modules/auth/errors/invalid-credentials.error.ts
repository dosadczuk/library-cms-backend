import { HttpAwareError, i18n } from '@/http/http-aware.error';
import { BadRequestException } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';

export class InvalidCredentialsError extends Error implements HttpAwareError {
  constructor() {
    super(i18n('auth.InvalidCredentials'));
  }

  getHttpError(): HttpException {
    return new BadRequestException(this.message);
  }
}
