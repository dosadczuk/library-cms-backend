import { File } from '@/modules/files/entities/file.entity';
import { FileNotFoundError } from '@/modules/files/error/file-not-found.error';
import { FindFileResult } from '@/modules/files/queries';
import { FindFileQuery } from '@/modules/files/queries/find-file/find-file.query';
import { FileRepository } from '@/modules/files/repositories/file.repository';
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
