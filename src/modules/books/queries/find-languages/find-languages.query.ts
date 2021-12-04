import { FindLanguagesFilterDto } from '@/modules/books/dto/find-languages-filter.dto';

export class FindLanguagesQuery {
  constructor(readonly filter: FindLanguagesFilterDto) {}
}
