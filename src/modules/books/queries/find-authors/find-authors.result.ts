import { FindAuthorsResultDto } from '@/modules/books/dto/find-authors-filter.dto';

export class FindAuthorsResult {
  constructor(readonly authors: FindAuthorsResultDto) {}
}
