import { FindTagsFilterDto } from '@/modules/books/dto/find-tags.dto';

export class FindTagsQuery {
  constructor(readonly filter: FindTagsFilterDto) {}
}
