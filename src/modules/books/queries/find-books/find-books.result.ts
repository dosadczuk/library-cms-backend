import { FindBooksResultDto } from '@/modules/books/dto';

export class FindBooksResult {
  constructor(readonly books: FindBooksResultDto) {}
}
