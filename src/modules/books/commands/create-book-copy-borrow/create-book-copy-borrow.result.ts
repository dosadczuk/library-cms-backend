import { CreateBookCopyBorrowResultDto } from '@/modules/books/dto';

export class CreateBookCopyBorrowResult {
  constructor(readonly borrow: CreateBookCopyBorrowResultDto) {}
}
