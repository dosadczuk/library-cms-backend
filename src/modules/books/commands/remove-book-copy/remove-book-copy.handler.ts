import { RemoveBookCopyCommand } from '@/modules/books/commands/remove-book-copy/remove-book-copy.command';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BookRepository } from '@/modules/books/repositories/book.repository';
import { BookNotFoundError } from '@/modules/books/errors/book-not-found.error';
import { Book } from '@/modules/books/entities/book.entity';

@CommandHandler(RemoveBookCopyCommand)
export class RemoveBookCopyHandler
  implements ICommandHandler<RemoveBookCopyCommand>
{
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
