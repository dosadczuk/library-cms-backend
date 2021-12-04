import { FindPublishersResultDto } from '@/modules/books/dto/find-publishers-filter.dto';

export class FindPublishersResult {
  constructor(readonly publishers: FindPublishersResultDto) {}
}
