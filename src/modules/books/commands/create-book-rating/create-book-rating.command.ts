import { CreateUpdateBookRatingBodyDto } from '@/modules/books/dto/create-update-book-rating.dto';

export class CreateBookRatingCommand {
  constructor(readonly bookId: number, readonly rating: CreateUpdateBookRatingBodyDto) {}
}
