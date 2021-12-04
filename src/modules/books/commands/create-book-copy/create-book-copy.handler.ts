import { CreateBookCopyCommand } from '@/modules/books/commands/create-book-copy/create-book-copy.command';
import { CreateBookCopyResult } from '@/modules/books/commands/create-book-copy/create-book-copy.result';
import { CreateBookCopyResultDto } from '@/modules/books/dto';
import { Book } from '@/modules/books/entities/book.entity';
import { Copy } from '@/modules/books/entities/copy.entity';
import { BookNotFoundError } from '@/modules/books/errors/book-not-found.error';
import { BookRepository } from '@/modules/books/repositories/book.repository';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(CreateBookCopyCommand)
export class CreateBookCopyHandler
  implements ICommandHandler<CreateBookCopyCommand, CreateBookCopyResult>
{
  constructor(private readonly bookRepository: BookRepository) {}

  async execute(command: CreateBookCopyCommand): Promise<CreateBookCopyResult> {
    const book = await this.findBook(command);
    if (book == null) {
      throw new BookNotFoundError(command.bookId);
    }

    await this.createBookCopy(book, command);

    await this.bookRepository.persist(book);

    return new CreateBookCopyResult(new CreateBookCopyResultDto());
  }

  private async findBook(command: CreateBookCopyCommand): Promise<Book | null> {
    return this.bookRepository.findOne(command.bookId);
  }

  private async createBookCopy(
    book: Book,
    command: CreateBookCopyCommand,
  ): Promise<Copy> {
    const copy = new Copy();
    copy.number = command.bookCopy.number;

    book.copies.push(copy);

    return copy;
  }
}
