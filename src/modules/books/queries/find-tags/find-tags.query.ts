import { FindTagsFilterDto } from '@/modules/books/dto/find-tags-filter.dto';

export class FindTagsQuery {
  constructor(readonly filter: FindTagsFilterDto) {}
}
