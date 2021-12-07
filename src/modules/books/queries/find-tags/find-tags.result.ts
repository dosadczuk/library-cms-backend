import { FindTagsResultDto } from '@/modules/books/dto/find-tags.dto';

export class FindTagsResult {
  constructor(readonly tags: FindTagsResultDto) {}
}
