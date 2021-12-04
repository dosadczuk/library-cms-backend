import { FindAuthorsFilterDto } from '@/modules/books/dto/find-authors-filter.dto';

export class FindAuthorsQuery {
  constructor(readonly filter?: FindAuthorsFilterDto) {}
}
