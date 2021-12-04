import { FindTagsResultDto } from '@/modules/books/dto/find-tags-filter.dto';

export class FindTagsResult {
  constructor(readonly tags: FindTagsResultDto) {}
}
