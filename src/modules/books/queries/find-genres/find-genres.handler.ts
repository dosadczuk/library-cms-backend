import { FindGenresResultDto } from '@/modules/books/dto/find-genres-filter.dto';
import { Genre } from '@/modules/books/entities/genre.entity';
import { FindGenresQuery } from '@/modules/books/queries/find-genres/find-genres.query';
import { FindGenresResult } from '@/modules/books/queries/find-genres/find-genres.result';
import { GenreRepository } from '@/modules/books/repositories/genre.repository';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(FindGenresQuery)
export class FindGenresHandler
  implements IQueryHandler<FindGenresQuery, FindGenresResult>
{
  constructor(private readonly genreRepository: GenreRepository) {}

  async execute(query: FindGenresQuery): Promise<FindGenresResult> {
    const genres = await this.findGenres(query);

    const result = new FindGenresResultDto();
    result.genres = genres;

    return new FindGenresResult(result);
  }

  private async findGenres(query: FindGenresQuery): Promise<Genre[]> {
    return this.genreRepository.findAll(query.filter);
  }
}
