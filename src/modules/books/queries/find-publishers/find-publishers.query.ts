import { FindPublishersFilterDto } from '@/modules/books/dto/find-publishers-filter.dto';

export class FindPublishersQuery {
  constructor(readonly filter: FindPublishersFilterDto) {}
}
