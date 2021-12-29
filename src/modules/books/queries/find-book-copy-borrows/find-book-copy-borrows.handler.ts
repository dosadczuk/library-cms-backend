import { FindBookCopyBorrowsResultDto } from '@/modules/books/dto';
import { Copy } from '@/modules/books/entities';
import { BookCopyNotFoundError } from '@/modules/books/errors';
import { FindBookCopyBorrowsQuery } from '@/modules/books/queries/find-book-copy-borrows/find-book-copy-borrows.query';
import { FindBookCopyBorrowsResult } from '@/modules/books/queries/find-book-copy-borrows/find-book-copy-borrows.result';
import { BookRepository } from '@/modules/books/repositories';
import { BorrowWithUserViewModel } from '@/modules/books/vms';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(FindBookCopyBorrowsQuery)
export class FindBookCopyBorrowsHandler
  implements IQueryHandler<FindBookCopyBorrowsQuery, FindBookCopyBorrowsResult>
{
  constructor(private readonly repository: BookRepository) {}

  async execute(query: FindBookCopyBorrowsQuery): Promise<FindBookCopyBorrowsResult> {
    const copy = await this.findBookCopy(query);
    if (copy == null) {
      throw new BookCopyNotFoundError(query.bookId, query.copyId);
    }

    const borrows = await this.findCopyBorrows(copy);

    const result = new FindBookCopyBorrowsResultDto(borrows);

    return new FindBookCopyBorrowsResult(result);
  }

  private async findBookCopy(query: FindBookCopyBorrowsQuery): Promise<Copy | null> {
    return this.repository.findBookCopy(query.bookId, query.copyId);
  }

  private async findCopyBorrows(copy: Copy): Promise<BorrowWithUserViewModel[]> {
    const borrows = await this.repository.findCopyBorrows(copy.id);

    return borrows.map((it) => new BorrowWithUserViewModel(it));
  }
}
