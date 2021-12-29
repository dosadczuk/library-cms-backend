import { FindBookCopyBorrowResultDto } from '@/modules/books/dto';
import { Borrow, Copy } from '@/modules/books/entities';
import { BookCopyBorrowNotFoundError, BookCopyNotFoundError } from '@/modules/books/errors';
import { FindBookCopyBorrowQuery } from '@/modules/books/queries/find-book-copy-borrow/find-book-copy-borrow.query';
import { FindBookCopyBorrowResult } from '@/modules/books/queries/find-book-copy-borrow/find-book-copy-borrow.result';
import { BookRepository } from '@/modules/books/repositories';
import { BorrowWithUserViewModel } from '@/modules/books/vms';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(FindBookCopyBorrowQuery)
export class FindBookCopyBorrowHandler
  implements IQueryHandler<FindBookCopyBorrowQuery, FindBookCopyBorrowResult>
{
  constructor(private readonly repository: BookRepository) {}

  async execute(query: FindBookCopyBorrowQuery): Promise<FindBookCopyBorrowResult> {
    const copy = await this.findBookCopy(query);
    if (copy == null || copy.bookId !== query.bookId) {
      throw new BookCopyNotFoundError(query.bookId, query.copyId);
    }

    const borrow = await this.findCopyBorrow(query);
    if (borrow == null) {
      throw new BookCopyBorrowNotFoundError(query.bookId, query.copyId, query.borrowId);
    }

    const result = new FindBookCopyBorrowResultDto(new BorrowWithUserViewModel(borrow));

    return new FindBookCopyBorrowResult(result);
  }

  private async findBookCopy(query: FindBookCopyBorrowQuery): Promise<Copy | null> {
    return this.repository.findBookCopy(query.bookId, query.copyId);
  }

  private async findCopyBorrow(query: FindBookCopyBorrowQuery): Promise<Borrow | null> {
    return this.repository.findCopyBorrow(query.copyId, query.borrowId);
  }
}
