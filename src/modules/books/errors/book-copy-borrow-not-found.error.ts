import { HttpAwareError, i18n } from '@/http/http-aware.error';
import { BadRequestException, HttpException } from '@nestjs/common';

export class BookCopyBorrowNotFoundError extends Error implements HttpAwareError {
  constructor(bookId: number, copyId: number, borrowId: number) {
    super(i18n('BookCopyBorrowNotFound', { bookId, copyId, borrowId }));
  }

  getHttpError(): HttpException {
    return new BadRequestException(this.message);
  }
}
