import { FindPublishersFilterDto } from '@/modules/books/dto/find-publishers.dto';

export class FindPublishersQuery {
  constructor(readonly filter: FindPublishersFilterDto) {}
}
