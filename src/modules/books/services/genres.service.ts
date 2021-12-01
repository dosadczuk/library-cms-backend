import { GenresFilter } from '@/modules/books/filters/genres.filter';
import { GenreRepository } from '@/modules/books/repositories/genre.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike } from 'typeorm';

export class GenresService {
  constructor(
    @InjectRepository(GenreRepository)
    private readonly genreRepository: GenreRepository,
  ) {}

  findAll(filter: GenresFilter) {
    const query = this.genreRepository.createQueryBuilder();

    if (filter.value != null) {
      query.andWhere({ value: ILike(`%${filter.value}%`) });
    }

    return query.getMany();
  }
}
