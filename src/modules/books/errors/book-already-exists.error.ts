import { HttpAwareError, i18n } from '@/shared/errors/http-aware.error';
import { BadRequestException, HttpException } from '@nestjs/common';

export class BookAlreadyExistsError extends Error implements HttpAwareError {
  constructor(public readonly isbn: string) {
    super(i18n('books.BookAlreadyExists', { isbn }));
  }

  getHttpError(): HttpException {
    return new BadRequestException(this.message);
  }
}
