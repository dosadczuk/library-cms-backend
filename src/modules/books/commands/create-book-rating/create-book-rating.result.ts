import { CreateUpdateBookRatingResultDto } from '@/modules/books/dto';

export class CreateBookRatingResult {
  constructor(readonly rating: CreateUpdateBookRatingResultDto) {}
}
