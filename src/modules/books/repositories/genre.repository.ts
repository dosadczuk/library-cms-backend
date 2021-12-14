import { FindGenresFilterDto } from '@/modules/books/dto';
import { Genre } from '@/modules/books/entities';
import { Injectable } from '@nestjs/common';
import { ILike } from 'typeorm';

@Injectable()
export class GenreRepository {
  /**
   * Pobiera wszystkie gatunki na podstawie podanego filtra.
   */
  async findAll(filter?: FindGenresFilterDto): Promise<Genre[]> {
    const query = Genre.createQueryBuilder();

    if (filter != null) {
      if (filter.value != null) {
        query.andWhere({ value: ILike(`%${filter.value}%`) });
      }
    }

    return query.getMany();
  }

  /**
   * Pobiera gatunek na postawie wartości.
   */
  async findByValue(value: string): Promise<Genre> {
    return Genre.findOne({ where: { value: ILike(value) } });
  }
}
