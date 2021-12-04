import { FindBookResultDto } from '@/modules/books/dto/find-book-result.dto';

export class FindBookResult {
  constructor(readonly book: FindBookResultDto) {}
}
