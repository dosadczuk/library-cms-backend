import { Language } from '@/modules/books/entities';
import { LanguagesFilter } from '@/modules/books/filters';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';

export class LanguagesService {
  constructor(
    @InjectRepository(Language)
    private readonly languageRepository: Repository<Language>,
  ) {}

  findAllWith(filter: LanguagesFilter): Promise<Language[]> {
    const query = this.languageRepository.createQueryBuilder();

    if (filter.value != null) {
      query.andWhere({ value: ILike(`%${filter.value}%`) });
    }

    return query.getMany();
  }
}
