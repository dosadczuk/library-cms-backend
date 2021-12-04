import { FindAuthorsResultDto } from '@/modules/books/dto/find-authors-filter.dto';
import { Author } from '@/modules/books/entities/author.entity';
import { FindAuthorsQuery } from '@/modules/books/queries/find-authors/find-authors.query';
import { FindAuthorsResult } from '@/modules/books/queries/find-authors/find-authors.result';
import { AuthorRepository } from '@/modules/books/repositories/author.repository';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(FindAuthorsQuery)
export class FindAuthorsHandler
  implements IQueryHandler<FindAuthorsQuery, FindAuthorsResult>
{
  constructor(private readonly authorRepository: AuthorRepository) {}

  async execute(query: FindAuthorsQuery): Promise<FindAuthorsResult> {
    const authors = await this.findAuthors(query);

    const result = new FindAuthorsResultDto();
    result.authors = authors;

    return new FindAuthorsResult(result);
  }

  private async findAuthors(query: FindAuthorsQuery): Promise<Author[]> {
    return this.authorRepository.findAll(query.filter);
  }
}
