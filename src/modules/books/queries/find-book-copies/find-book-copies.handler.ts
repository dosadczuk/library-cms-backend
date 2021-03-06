import { FindBookCopiesResultDto } from '@/modules/books/dto';
import { Book } from '@/modules/books/entities';
import { BookNotFoundError } from '@/modules/books/errors';
import { FindBookCopiesQuery } from '@/modules/books/queries/find-book-copies/find-book-copies.query';
import { FindBookCopiesResult } from '@/modules/books/queries/find-book-copies/find-book-copies.result';
import { BookRepository } from '@/modules/books/repositories';
import { CopyViewModel } from '@/modules/books/vms';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(FindBookCopiesQuery)
export class FindBookCopiesHandler
  implements IQueryHandler<FindBookCopiesQuery, FindBookCopiesResult>
{
  constructor(private readonly repository: BookRepository) {}

  async execute(command: FindBookCopiesQuery): Promise<FindBookCopiesResult> {
    const book = await this.findBook(command);
    if (book == null) {
      throw new BookNotFoundError(command.bookId);
    }

    const copies = await this.findBookCopies(book);

    const result = new FindBookCopiesResultDto(copies);

    return new FindBookCopiesResult(result);
  }

  private async findBook(command: FindBookCopiesQuery): Promise<Book | null> {
    return this.repository.findOne(command.bookId);
  }

  private async findBookCopies(book: Book): Promise<CopyViewModel[]> {
    const copies = await this.repository.findBookCopies(book.id);

    return copies.map((it) => new CopyViewModel(it));
  }
}
