import { FindPublishersFilterDto } from '@/modules/books/dto';

export class FindPublishersQuery {
  constructor(readonly filter: FindPublishersFilterDto) {}
}
