import { FindAuthorsResultDto } from '@/modules/books/dto/find-authors.dto';

export class FindAuthorsResult {
  constructor(readonly authors: FindAuthorsResultDto) {}
}
