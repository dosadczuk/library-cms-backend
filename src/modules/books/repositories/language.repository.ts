import { FindLanguagesFilterDto } from '@/modules/books/dto';
import { Language } from '@/modules/books/entities';
import { Injectable } from '@nestjs/common';
import { ILike } from 'typeorm';

@Injectable()
export class LanguageRepository {
  /**
   * Pobiera wszystkie języki na podstawie podanego filtra.
   */
  async findAll(filter?: FindLanguagesFilterDto): Promise<Language[]> {
    const query = Language.createQueryBuilder();

    if (filter != null) {
      if (filter.value != null) {
        query.andWhere({ value: ILike(`%${filter.value}%`) });
      }
    }

    return query.getMany();
  }

  /**
   * Pobiera język na podstawie wartości.
   */
  async findByValue(value: string): Promise<Language> {
    return Language.findOne({ where: { value: ILike(value) } });
  }
}
