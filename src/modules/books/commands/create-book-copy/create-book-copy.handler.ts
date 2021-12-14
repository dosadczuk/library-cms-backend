import { CreateBookCopyCommand } from '@/modules/books/commands/create-book-copy/create-book-copy.command';
import { CreateBookCopyResult } from '@/modules/books/commands/create-book-copy/create-book-copy.result';
import { CreateBookCopyResultDto } from '@/modules/books/dto';
import { Book, Copy } from '@/modules/books/entities';
import { BookNotFoundError } from '@/modules/books/errors';
import { BookRepository } from '@/modules/books/repositories';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(CreateBookCopyCommand)
export class CreateBookCopyHandler
  implements ICommandHandler<CreateBookCopyCommand, CreateBookCopyResult>
{
  constructor(private readonly repository: BookRepository) {}

  async execute(command: CreateBookCopyCommand): Promise<CreateBookCopyResult> {
    const book = await this.findBook(command);
    if (book == null) {
      throw new BookNotFoundError(command.bookId);
    }

    const copy = await this.createBookCopy(book, command);

    await this.repository.persist(book);

    return new CreateBookCopyResult(new CreateBookCopyResultDto(copy));
  }

  private async findBook(command: CreateBookCopyCommand): Promise<Book | null> {
    return this.repository.findOne(command.bookId);
  }

  private async createBookCopy(book: Book, command: CreateBookCopyCommand): Promise<Copy> {
    const copy = new Copy();
    copy.number = command.copy.number;

    book.copies.push(copy);

    return copy;
  }
}
