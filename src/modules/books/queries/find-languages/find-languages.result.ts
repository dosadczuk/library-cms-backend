import { FindLanguagesResultDto } from '@/modules/books/dto/find-languages-filter.dto';

export class FindLanguagesResult {
  constructor(readonly languages: FindLanguagesResultDto) {}
}
