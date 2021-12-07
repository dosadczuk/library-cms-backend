import { HttpAwareError, i18n } from '@/shared/errors/http-aware.error';
import { BadRequestException, HttpException } from '@nestjs/common';

export class BookNotFoundError extends Error implements HttpAwareError {
  constructor(id: number) {
    super(i18n('books.BookNotFound', { id }));
  }

  getHttpError(): HttpException {
    return new BadRequestException(this.message);
  }
}
