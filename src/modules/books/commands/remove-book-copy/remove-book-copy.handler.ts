import { RemoveBookCopyCommand } from '@/modules/books/commands/remove-book-copy/remove-book-copy.command';
import { Book } from '@/modules/books/entities';
import { BookNotFoundError } from '@/modules/books/errors';
import { BookRepository } from '@/modules/books/repositories';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(RemoveBookCopyCommand)
export class RemoveBookCopyHandler implements ICommandHandler<RemoveBookCopyCommand> {
  constructor(private readonly repository: BookRepository) {}

  async execute(command: RemoveBookCopyCommand): Promise<void> {
    const book = await this.findBook(command);
    if (book == null) {
      throw new BookNotFoundError(command.bookId);
    }

    await this.removeBookCopy(book, command);

    await this.repository.persist(book);
  }

  private async findBook(command: RemoveBookCopyCommand): Promise<Book | null> {
    return this.repository.findOne(command.bookId);
  }

  private async removeBookCopy(book: Book, command: RemoveBookCopyCommand) {
    book.copies = book.copies.filter((it) => it.id != command.copyId);
  }
}
