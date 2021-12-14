import { FindAuthorsFilterDto } from '@/modules/books/dto';

export class FindAuthorsQuery {
  constructor(readonly filter?: FindAuthorsFilterDto) {}
}
