import { FindLanguagesResultDto } from '@/modules/books/dto/find-languages.dto';

export class FindLanguagesResult {
  constructor(readonly languages: FindLanguagesResultDto) {}
}
