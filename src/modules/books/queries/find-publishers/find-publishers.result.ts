import { FindPublishersResultDto } from '@/modules/books/dto/find-publishers.dto';

export class FindPublishersResult {
  constructor(readonly publishers: FindPublishersResultDto) {}
}
