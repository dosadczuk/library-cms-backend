import { FindGenresFilterDto } from '@/modules/books/dto/find-genres.dto';

export class FindGenresQuery {
  constructor(readonly filter: FindGenresFilterDto) {}
}
