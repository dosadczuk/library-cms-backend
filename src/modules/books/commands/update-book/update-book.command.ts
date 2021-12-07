import { ManageBookCommand } from '@/modules/books/commands/manage-book/manage-book.command';
import { CreateUpdateBookBodyDto } from '@/modules/books/dto/create-update-book.dto';

export class UpdateBookCommand extends ManageBookCommand {
  constructor(readonly bookId: number, book: CreateUpdateBookBodyDto) {
    super(book);
  }
}
