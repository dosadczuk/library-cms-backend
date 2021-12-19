import { CreateBookCopyBodyDto } from '@/modules/books/dto';

export class CreateBookCopyCommand {
  constructor(readonly bookId: number, readonly copy: CreateBookCopyBodyDto) {}

  get number(): string {
    return this.copy.number;
  }
}
