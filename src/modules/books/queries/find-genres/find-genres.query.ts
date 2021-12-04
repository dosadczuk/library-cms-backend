import { FindGenresFilterDto } from '@/modules/books/dto/find-genres-filter.dto';

export class FindGenresQuery {
  constructor(readonly filter: FindGenresFilterDto) {}
}
