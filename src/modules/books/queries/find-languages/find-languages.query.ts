import { FindLanguagesFilterDto } from '@/modules/books/dto';

export class FindLanguagesQuery {
  constructor(readonly filter: FindLanguagesFilterDto) {}
}
