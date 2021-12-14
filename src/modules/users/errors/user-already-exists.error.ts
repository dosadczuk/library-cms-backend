import { HttpAwareError, i18n } from '@/http/http-aware.error';
import { BadRequestException } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';

export class UserAlreadyExistsError extends Error implements HttpAwareError {
  constructor(email: string) {
    super(i18n('users.UserAlreadyExists', { email }));
  }

  getHttpError(): HttpException {
    return new BadRequestException(this.message);
  }
}
