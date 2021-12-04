import { FindGenresResultDto } from '@/modules/books/dto/find-genres-filter.dto';

export class FindGenresResult {
  constructor(readonly genres: FindGenresResultDto) {}
}
