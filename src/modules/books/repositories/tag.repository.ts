import { FindTagsFilterDto } from '@/modules/books/dto/find-tags.dto';
import { Tag } from '@/modules/books/entities/tag.entity';
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
  async findByNames(value: string): Promise<Tag> {
    return Tag.findOne({ where: { value: ILike(value) } });
  }
}
