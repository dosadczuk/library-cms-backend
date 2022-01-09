import { FindTagsFilterDto } from '@/modules/books/dto';
import { Tag } from '@/modules/books/entities';
import { Injectable } from '@nestjs/common';
import { ILike } from 'typeorm';

@Injectable()
export class TagRepository {
  /**
   * Pobiera wszystkie tagi na podstawie podanego filtra.
   */
  async findAll(filter?: FindTagsFilterDto): Promise<Tag[]> {
    const query = Tag.createQueryBuilder();

    if (filter != null) {
      if (filter.value != null) {
        query.andWhere({ value: ILike(`%${filter.value}%`) });
      }
    }

    return query.getMany();
  }

  /**
   * Pobiera tag na podstawie wartości.
   */
  async findOne(id: number): Promise<Tag | null> {
    return Tag.findOne(id);
  }

  /**
   * Pobiera tag na podstawie wartości.
   */
  async findByValue(value: string): Promise<Tag | null> {
    return Tag.findOne({ where: { value: ILike(value) } });
  }
}
