import { Genre } from '@/modules/books/entities/genre.entity';
import { GenresFilter } from '@/modules/books/filters/genres.filter';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';

export class GenresService {
  constructor(
    @InjectRepository(Genre)
    private readonly genresRepository: Repository<Genre>,
  ) {}

  findAll(filter: GenresFilter) {
    const query = this.genresRepository.createQueryBuilder();

    if (filter.value != null) {
      query.andWhere({ value: ILike(`%${filter.value}%`) });
    }

    return query.getMany();
  }
}
