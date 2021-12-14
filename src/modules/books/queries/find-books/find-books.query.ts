import { FindBooksFilterDto } from '@/modules/books/dto';

export class FindBooksQuery {
  constructor(readonly filter: FindBooksFilterDto) {}
}
