import { Genre } from '@/modules/books/entities';
import { GenresFilter } from '@/modules/books/filters';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';

export class GenresService {
  constructor(
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
  ) {}

  findAllWith(filter: GenresFilter): Promise<Genre[]> {
    const query = this.genreRepository.createQueryBuilder();

    if (filter.value != null) {
      query.andWhere({ value: ILike(`%${filter.value}%`) });
    }

    return query.getMany();
  }
}
