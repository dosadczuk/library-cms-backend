import { FindGenresFilterDto } from '@/modules/books/dto';

export class FindGenresQuery {
  constructor(readonly filter: FindGenresFilterDto) {}
}
