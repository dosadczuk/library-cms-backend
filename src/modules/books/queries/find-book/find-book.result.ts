import { FindBookResultDto } from '@/modules/books/dto/find-book.dto';

export class FindBookResult {
  constructor(readonly book: FindBookResultDto) {}
}
