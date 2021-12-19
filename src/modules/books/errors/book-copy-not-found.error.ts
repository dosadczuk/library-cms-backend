import { HttpAwareError, i18n } from '@/http/http-aware.error';
import { BadRequestException, HttpException } from '@nestjs/common';

export class BookCopyNotFoundError extends Error implements HttpAwareError {
  constructor(bookId: number, copyId: number) {
    super(i18n('BookCopyNotFound', { bookId, copyId }));
  }

  getHttpError(): HttpException {
    return new BadRequestException(this.message);
  }
}
