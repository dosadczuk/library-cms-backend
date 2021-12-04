import { CreateBookCopyResultDto } from '@/modules/books/dto/create-book-copy.dto';

export class CreateBookCopyResult {
  constructor(readonly bookCopy: CreateBookCopyResultDto) {}
}
