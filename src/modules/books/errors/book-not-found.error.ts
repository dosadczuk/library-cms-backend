import { Book } from '@/modules/books/entities/book.entity';
import { EntityNotFoundError } from 'typeorm';

export class BookNotFoundError extends EntityNotFoundError {
  constructor(criteria: any) {
    super(Book, criteria);
  }
}
