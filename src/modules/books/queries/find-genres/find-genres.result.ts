import { FindGenresResultDto } from '@/modules/books/dto/find-genres.dto';

export class FindGenresResult {
  constructor(readonly genres: FindGenresResultDto) {}
}
