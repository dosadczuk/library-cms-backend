import { CreateBookCopyBorrowBodyDto } from '@/modules/books/dto';

export class CreateBookCopyBorrowCommand {
  constructor(
    readonly bookId: number,
    readonly copyId: number,
    readonly borrow: CreateBookCopyBorrowBodyDto,
  ) {}

  get userId(): number {
    return this.borrow.userId;
  }
}
