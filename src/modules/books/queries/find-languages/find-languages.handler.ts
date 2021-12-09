import { FindLanguagesResultDto } from '@/modules/books/dto/find-languages.dto';
import { FindLanguagesQuery } from '@/modules/books/queries/find-languages/find-languages.query';
import { FindLanguagesResult } from '@/modules/books/queries/find-languages/find-languages.result';
import { LanguageRepository } from '@/modules/books/repositories/language.repository';
import { LanguageViewModel } from '@/modules/books/vms/language.vm';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(FindLanguagesQuery)
export class FindLanguagesHandler
  implements IQueryHandler<FindLanguagesQuery, FindLanguagesResult>
{
  constructor(private readonly languageRepository: LanguageRepository) {}

  async execute(query: FindLanguagesQuery): Promise<FindLanguagesResult> {
    const languages = await this.findLanguages(query);

    const result = new FindLanguagesResultDto(languages);

    return new FindLanguagesResult(result);
  }

  private async findLanguages(
    query: FindLanguagesQuery,
  ): Promise<LanguageViewModel[]> {
    const languages = await this.languageRepository.findAll(query.filter);

    return languages.map((it) => new LanguageViewModel(it));
  }
}
