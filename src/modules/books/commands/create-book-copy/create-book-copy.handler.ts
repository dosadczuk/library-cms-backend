import { CreateBookCopyCommand } from '@/modules/books/commands/create-book-copy/create-book-copy.command';
import { CreateBookCopyResult } from '@/modules/books/commands/create-book-copy/create-book-copy.result';
import { CreateBookCopyResultDto } from '@/modules/books/dto';
import { Book, Copy } from '@/modules/books/entities';
import { BookNotFoundError } from '@/modules/books/errors';
import { BookCopyAlreadyExistsError } from '@/modules/books/errors/book-copy-already-exists.error';
import { BookRepository } from '@/modules/books/repositories';
import { CopyViewModel } from '@/modules/books/vms';
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

    if (await this.findBookCopyExists(command)) {
      throw new BookCopyAlreadyExistsError(command.bookId, command.number);
    }

    const copy = this.createBookCopy(book, command);

    await this.repository.persistCopy(copy);

    const result = new CreateBookCopyResultDto(new CopyViewModel(copy));

    return new CreateBookCopyResult(result);
  }

  private async findBook(command: CreateBookCopyCommand): Promise<Book | null> {
    return this.repository.findOne(command.bookId);
  }

  private async findBookCopyExists(command: CreateBookCopyCommand): Promise<boolean> {
    return this.repository.isBookCopyExists(command.bookId, command.number);
  }

  private createBookCopy(book: Book, command: CreateBookCopyCommand): Copy {
    const copy = new Copy();
    copy.number = command.copy.number;
    copy.book = book;

    return copy;
  }
}
