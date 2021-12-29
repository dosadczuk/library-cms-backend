import { FindBookRatingsResultDto } from '@/modules/books/dto';
import { Book } from '@/modules/books/entities';
import { BookNotFoundError } from '@/modules/books/errors';
import { FindBookRatingsQuery } from '@/modules/books/queries/find-book-ratings/find-book-ratings.query';
import { FindBookRatingsResult } from '@/modules/books/queries/find-book-ratings/find-book-ratings.result';
import { BookRepository } from '@/modules/books/repositories';
import { RatingViewModel } from '@/modules/books/vms';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(FindBookRatingsQuery)
export class FindBookRatingsHandler
  implements IQueryHandler<FindBookRatingsQuery, FindBookRatingsResult>
{
  constructor(private readonly repository: BookRepository) {}

  async execute(query: FindBookRatingsQuery): Promise<FindBookRatingsResult> {
    const book = await this.findBook(query);
    if (book == null) {
      throw new BookNotFoundError(query.bookId);
    }

    const ratings = await this.findBookRatings(book);

    const result = new FindBookRatingsResultDto(ratings);

    return new FindBookRatingsResult(result);
  }

  private async findBook(query: FindBookRatingsQuery): Promise<Book> {
    return this.repository.findOne(query.bookId);
  }

  private async findBookRatings(book: Book): Promise<RatingViewModel[]> {
    const ratings = await this.repository.findBookRatings(book.id);

    return ratings.map((it) => new RatingViewModel(it));
  }
}
