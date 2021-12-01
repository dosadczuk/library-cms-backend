import { Genre } from '@/modules/books/entities/genre.entity';
import { EntityRepository, ILike, Repository } from 'typeorm';

@EntityRepository(Genre)
export class GenreRepository extends Repository<Genre> {
  findByValue(value: string): Promise<Genre | null> {
    return this.findOne({
      where: {
        value: ILike(value),
      },
    });
  }
}
