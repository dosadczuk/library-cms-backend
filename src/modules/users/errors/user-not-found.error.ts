import { HttpAwareError, i18n } from '@/http/http-aware.error';
import { BadRequestException } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';

export class UserNotFoundError extends Error implements HttpAwareError {
  constructor(id: number) {
    super(i18n('users.UserNotFoundById', { id }));
  }

  getHttpError(): HttpException {
    return new BadRequestException(this.message);
  }
}
