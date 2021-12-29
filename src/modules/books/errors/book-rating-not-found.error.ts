import { HttpAwareError, i18n } from '@/http/http-aware.error';
import { BadRequestException, HttpException } from '@nestjs/common';

export class BookRatingNotFoundError extends Error implements HttpAwareError {
  constructor(bookId: number, ratingId: number) {
    super(i18n('BookRatingNotFound', { bookId, ratingId }));
  }

  getHttpError(): HttpException {
    return new BadRequestException(this.message);
  }
}
