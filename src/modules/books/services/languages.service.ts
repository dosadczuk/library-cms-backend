import { LanguagesFilter } from '@/modules/books/filters/languages.filter';
import { LanguageRepository } from '@/modules/books/repositories/language.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike } from 'typeorm';

export class LanguagesService {
  constructor(
    @InjectRepository(LanguageRepository)
    private readonly languageRepository: LanguageRepository,
  ) {}

  findAll(filter: LanguagesFilter) {
    const query = this.languageRepository.createQueryBuilder();

    if (filter.value != null) {
      query.andWhere({ value: ILike(`%${filter.value}%`) });
    }

    return query.getMany();
  }
}
