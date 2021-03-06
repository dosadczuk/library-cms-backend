import { FindAuthorsResultDto } from '@/modules/books/dto';
import { FindAuthorsQuery } from '@/modules/books/queries/find-authors/find-authors.query';
import { FindAuthorsResult } from '@/modules/books/queries/find-authors/find-authors.result';
import { AuthorRepository } from '@/modules/books/repositories';
import { AuthorViewModel } from '@/modules/books/vms';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(FindAuthorsQuery)
export class FindAuthorsHandler implements IQueryHandler<FindAuthorsQuery, FindAuthorsResult> {
  constructor(private readonly repository: AuthorRepository) {}

  async execute(query: FindAuthorsQuery): Promise<FindAuthorsResult> {
    const authors = await this.findAuthors(query);

    const result = new FindAuthorsResultDto(authors);

    return new FindAuthorsResult(result);
  }

  private async findAuthors(query: FindAuthorsQuery): Promise<AuthorViewModel[]> {
    const authors = await this.repository.findAll(query.filter);

    return authors.map((it) => new AuthorViewModel(it));
  }
}
