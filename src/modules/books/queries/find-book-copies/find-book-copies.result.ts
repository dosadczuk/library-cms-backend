import { FindBookCopiesResultDto } from '@/modules/books/dto/find-book-copies-result.dto';

export class FindBookCopiesResult {
  constructor(readonly bookCopies: FindBookCopiesResultDto) {}
}
