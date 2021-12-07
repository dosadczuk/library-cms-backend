import { FindAuthorsFilterDto } from '@/modules/books/dto/find-authors.dto';

export class FindAuthorsQuery {
  constructor(readonly filter?: FindAuthorsFilterDto) {}
}
