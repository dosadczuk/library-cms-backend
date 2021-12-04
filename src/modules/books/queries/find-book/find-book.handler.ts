import { FindBookQuery } from '@/modules/books/queries/find-book/find-book.query';
import { FindBookResult } from '@/modules/books/queries/find-book/find-book.result';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(FindBookQuery)
export class FindBookHandler
  implements IQueryHandler<FindBookQuery, FindBookResult>
{
  async execute(query: FindBookQuery): Promise<FindBookResult> {
    return Promise.resolve(undefined);
  }
}
