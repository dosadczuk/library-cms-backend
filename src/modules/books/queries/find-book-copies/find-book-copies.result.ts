import { FindBookCopiesResultDto } from '@/modules/books/dto/find-book-copies.dto';

export class FindBookCopiesResult {
  constructor(readonly bookCopies: FindBookCopiesResultDto) {}
}
