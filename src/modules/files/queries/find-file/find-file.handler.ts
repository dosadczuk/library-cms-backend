import { File } from '@/modules/files/entities';
import { FileNotFoundError } from '@/modules/files/errors';
import { FindFileQuery } from '@/modules/files/queries/find-file/find-file.query';
import { FindFileResult } from '@/modules/files/queries/find-file/find-file.result';
import { FileRepository } from '@/modules/files/repositories';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(FindFileQuery)
export class FindFileHandler implements IQueryHandler<FindFileQuery> {
  constructor(private readonly repository: FileRepository) {}

  async execute(query: FindFileQuery): Promise<any> {
    const file = await this.findFile(query);
    if (file == null) {
      throw new FileNotFoundError(query.fileId);
    }

    return new FindFileResult(file.path, file.mime, file.size);
  }

  private findFile(query: FindFileQuery): Promise<File> {
    return this.repository.findOne(query.fileId);
  }
}
