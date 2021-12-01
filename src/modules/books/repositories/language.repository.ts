import { Language } from '@/modules/books/entities/language.entity';
import { EntityRepository, ILike, Repository } from 'typeorm';

@EntityRepository(Language)
export class LanguageRepository extends Repository<Language> {
  findByValue(value: string) {
    return this.findOne({
      where: {
        value: ILike(value),
      },
    });
  }
}
