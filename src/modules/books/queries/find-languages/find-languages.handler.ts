import { FindLanguagesResultDto } from '@/modules/books/dto/find-languages-filter.dto';
import { Language } from '@/modules/books/entities/language.entity';
import { FindLanguagesQuery } from '@/modules/books/queries/find-languages/find-languages.query';
import { FindLanguagesResult } from '@/modules/books/queries/find-languages/find-languages.result';
import { LanguageRepository } from '@/modules/books/repositories/language.repository';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(FindLanguagesQuery)
export class FindLanguagesHandler
  implements IQueryHandler<FindLanguagesQuery, FindLanguagesResult>
{
  constructor(private readonly languageRepository: LanguageRepository) {}

  async execute(query: FindLanguagesQuery): Promise<FindLanguagesResult> {
    const languages = await this.findLanguages(query);

    const result = new FindLanguagesResultDto();
    result.languages = languages;

    return new FindLanguagesResult(result);
  }

  private async findLanguages(query: FindLanguagesQuery): Promise<Language[]> {
    return this.languageRepository.findAll(query.filter);
  }
}
