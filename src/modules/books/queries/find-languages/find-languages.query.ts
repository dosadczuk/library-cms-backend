import { FindLanguagesFilterDto } from '@/modules/books/dto/find-languages.dto';

export class FindLanguagesQuery {
  constructor(readonly filter: FindLanguagesFilterDto) {}
}
