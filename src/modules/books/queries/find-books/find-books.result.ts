import { FindBooksResultDto } from '@/modules/books/dto/find-books.dto';

export class FindBooksResult {
  constructor(readonly books: FindBooksResultDto) {}
}
