import { ManageBookCommand } from '@/modules/books/commands/manage-book/manage-book.command';
import { CreateUpdateBookDto } from '@/modules/books/dto/create-update-book.dto';

export class UpdateBookCommand extends ManageBookCommand {
  constructor(readonly bookId: string, book: CreateUpdateBookDto) {
    super(book);
  }
}
