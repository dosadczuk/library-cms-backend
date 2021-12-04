import { FindBookCopiesQuery } from '@/modules/books/queries/find-book-copies/find-book-copies.query';
import { FindBookCopiesResult } from '@/modules/books/queries/find-book-copies/find-book-copies.result';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(FindBookCopiesQuery)
export class FindBookCopiesHandler
  implements IQueryHandler<FindBookCopiesQuery, FindBookCopiesResult>
{
  async execute(command: FindBookCopiesQuery): Promise<FindBookCopiesResult> {
    return Promise.resolve(undefined);
  }
}
