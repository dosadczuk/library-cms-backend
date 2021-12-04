import { RemoveBookCommand } from '@/modules/books/commands/remove-book/remove-book.command';
import { Book } from '@/modules/books/entities/book.entity';
import { BookNotFoundError } from '@/modules/books/errors/book-not-found.error';
import { BookRepository } from '@/modules/books/repositories/book.repository';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(RemoveBookCommand)
export class RemoveBookHandler implements ICommandHandler<RemoveBookCommand> {
  constructor(private readonly bookRepository: BookRepository) {}

  async execute(command: RemoveBookCommand): Promise<void> {
    const book = await this.findBook(command);
    if (book == null) {
      throw new BookNotFoundError(command.bookId);
    }

    await this.bookRepository.remove(book);
  }

  private findBook(command: RemoveBookCommand): Promise<Book> {
    return this.bookRepository.findOne(command.bookId);
  }
}
