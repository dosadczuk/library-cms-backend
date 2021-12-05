import { FindBooksFilterDto } from '@/modules/books/dto/find-books.dto';

export class FindBooksQuery {
  constructor(readonly filter: FindBooksFilterDto) {}
}
