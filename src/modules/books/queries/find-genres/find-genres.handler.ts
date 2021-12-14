import { FindGenresResultDto } from '@/modules/books/dto';
import { FindGenresQuery } from '@/modules/books/queries/find-genres/find-genres.query';
import { FindGenresResult } from '@/modules/books/queries/find-genres/find-genres.result';
import { GenreRepository } from '@/modules/books/repositories';
import { GenreViewModel } from '@/modules/books/vms';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(FindGenresQuery)
export class FindGenresHandler implements IQueryHandler<FindGenresQuery, FindGenresResult> {
  constructor(private readonly genreRepository: GenreRepository) {}

  async execute(query: FindGenresQuery): Promise<FindGenresResult> {
    const genres = await this.findGenres(query);

    const result = new FindGenresResultDto(genres);

    return new FindGenresResult(result);
  }

  private async findGenres(query: FindGenresQuery): Promise<GenreViewModel[]> {
    const genres = await this.genreRepository.findAll(query.filter);

    return genres.map((it) => new GenreViewModel(it));
  }
}
