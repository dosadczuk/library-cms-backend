import { HttpError } from '@/errors/http.error';
import { Book } from '@/modules/books/entities/book.entity';
import { HttpException, NotFoundException } from '@nestjs/common';
import { EntityNotFoundError as NotFoundError } from 'typeorm';

export class BookNotFoundError extends NotFoundError implements HttpError {
  constructor(criteria: any) {
    super(Book, criteria);
  }

  getHttpError(): HttpException {
    return new NotFoundException(this.message);
  }
}
