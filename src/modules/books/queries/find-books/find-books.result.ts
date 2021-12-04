import { FindBooksResultDto } from '@/modules/books/dto/find-books-filter.dto';

export class FindBooksResult {
  constructor(readonly books: FindBooksResultDto) {}
}
