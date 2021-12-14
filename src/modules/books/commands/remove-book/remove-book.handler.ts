import { RemoveBookCommand } from '@/modules/books/commands/remove-book/remove-book.command';
import { Book } from '@/modules/books/entities';
import { BookNotFoundError } from '@/modules/books/errors';
import { BookRepository } from '@/modules/books/repositories';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(RemoveBookCommand)
export class RemoveBookHandler implements ICommandHandler<RemoveBookCommand> {
  constructor(private readonly repository: BookRepository) {}

  async execute(command: RemoveBookCommand): Promise<void> {
    const book = await this.findBook(command);
    if (book == null) {
      throw new BookNotFoundError(command.bookId);
    }

    await this.repository.remove(book);
  }

  private findBook(command: RemoveBookCommand): Promise<Book> {
    return this.repository.findOne(command.bookId);
  }
}
