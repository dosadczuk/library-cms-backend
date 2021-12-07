import { Book } from '@/modules/books/entities/book.entity';
import { HttpAwareError } from '@/shared/errors/http-aware.error';
import { BadRequestException } from '@nestjs/common';
import { EntityNotFoundError as NotFoundError } from 'typeorm';

export class BookNotFoundError extends NotFoundError implements HttpAwareError {
  constructor(criteria: any) {
    super(Book, criteria);
  }

  getHttpError(): Error {
    return new BadRequestException(this, this.message);
  }
}
