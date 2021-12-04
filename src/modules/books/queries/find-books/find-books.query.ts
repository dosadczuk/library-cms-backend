import { FindBooksFilterDto } from '@/modules/books/dto/find-books-filter.dto';

export class FindBooksQuery {
  constructor(readonly filter: FindBooksFilterDto) {}
}
