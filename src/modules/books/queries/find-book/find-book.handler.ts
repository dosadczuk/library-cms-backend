import { FindBookResultDto } from '@/modules/books/dto';
import { BookNotFoundError } from '@/modules/books/errors/book-not-found.error';
import { FindBookQuery } from '@/modules/books/queries/find-book/find-book.query';
import { FindBookResult } from '@/modules/books/queries/find-book/find-book.result';
import { BookRepository } from '@/modules/books/repositories/book.repository';
import { BookViewModel } from '@/modules/books/vms/book.vm';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(FindBookQuery)
export class FindBookHandler implements IQueryHandler<FindBookQuery, FindBookResult> {
  constructor(private readonly repository: BookRepository) {}

  async execute(query: FindBookQuery): Promise<FindBookResult> {
    const book = await this.findBook(query);
    if (book == null) {
      throw new BookNotFoundError(query.bookId);
    }

    const result = new FindBookResultDto(book);

    return new FindBookResult(result);
  }

  private async findBook(query: FindBookQuery): Promise<BookViewModel | null> {
    const book = await this.repository.findOne(query.bookId);
    if (book == null) {
      return null;
    }

    return new BookViewModel(book);
  }
}
