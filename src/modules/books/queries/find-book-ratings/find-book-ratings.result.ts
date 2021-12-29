import { FindBookRatingsResultDto } from '@/modules/books/dto';

export class FindBookRatingsResult {
  constructor(readonly ratings: FindBookRatingsResultDto) {}
}
