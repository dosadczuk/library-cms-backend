import { FindUserBorrowsResultDto } from '@/modules/books/dto';

export class FindUserBorrowsResult {
  constructor(readonly borrows: FindUserBorrowsResultDto) {}
}
