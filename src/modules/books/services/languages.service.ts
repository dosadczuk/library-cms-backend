import { Language } from '@/modules/books/entities/language.entity';
import { LanguagesFilter } from '@/modules/books/filters/languages.filter';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';

export class LanguagesService {
  constructor(
    @InjectRepository(Language)
    private readonly languagesRepository: Repository<Language>,
  ) {}

  findAll(filter: LanguagesFilter) {
    const query = this.languagesRepository.createQueryBuilder();

    if (filter.value != null) {
      query.andWhere({ value: ILike(`%${filter.value}%`) });
    }

    return query.getMany();
  }
}
