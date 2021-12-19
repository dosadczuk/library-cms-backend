import { HttpAwareError, i18n } from '@/http/http-aware.error';
import { BadRequestException, HttpException } from '@nestjs/common';

export class BookCopyAlreadyExistsError extends Error implements HttpAwareError {
  constructor(readonly bookId: number, readonly number: string) {
    super(i18n('books.BookCopyAlreadyExists', { bookId, number }));
  }

  getHttpError(): HttpException {
    return new BadRequestException(this.message);
  }
}
