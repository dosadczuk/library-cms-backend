import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindFileQuery } from '@/modules/files/queries/find-file/find-file.query';

@QueryHandler(FindFileQuery)
export class FindFileHandler implements IQueryHandler<FindFileQuery> {
  execute(query: FindFileQuery): Promise<any> {
    return Promise.resolve(undefined);
  }
}
