import { CreateBookCopyBodyDto } from '@/modules/books/dto/create-book-copy.dto';

export class CreateBookCopyCommand {
  constructor(readonly bookId: number, readonly copy: CreateBookCopyBodyDto) {}
}
