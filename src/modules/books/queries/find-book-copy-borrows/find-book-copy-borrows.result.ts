import { FindBookCopyBorrowsResultDto } from '@/modules/books/dto';

export class FindBookCopyBorrowsResult {
  constructor(readonly borrows: FindBookCopyBorrowsResultDto) {}
}
