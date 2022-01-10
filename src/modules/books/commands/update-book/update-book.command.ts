import { ManageBookCommand } from '@/modules/books/commands/manage-book/manage-book.command';
import { UpdateBookBodyDto } from '@/modules/books/dto';

export class UpdateBookCommand extends ManageBookCommand {
  constructor(readonly bookId: number, book: UpdateBookBodyDto) {
    super(book);
  }
}
