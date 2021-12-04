import { CreateBookCopyDto } from '@/modules/books/dto/create-book-copy.dto';

export class CreateBookCopyCommand {
  constructor(readonly bookId: string, readonly bookCopy: CreateBookCopyDto) {}
}
