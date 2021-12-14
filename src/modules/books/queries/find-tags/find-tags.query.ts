import { FindTagsFilterDto } from '@/modules/books/dto';

export class FindTagsQuery {
  constructor(readonly filter: FindTagsFilterDto) {}
}
