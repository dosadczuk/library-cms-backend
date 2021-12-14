import { FindBookCopiesResultDto } from '@/modules/books/dto';

export class FindBookCopiesResult {
  constructor(readonly bookCopies: FindBookCopiesResultDto) {}
}
