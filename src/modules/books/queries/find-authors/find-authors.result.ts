import { FindAuthorsResultDto } from '@/modules/books/dto';

export class FindAuthorsResult {
  constructor(readonly authors: FindAuthorsResultDto) {}
}
