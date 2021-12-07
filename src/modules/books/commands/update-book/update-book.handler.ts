import { ManageBookHandler } from '@/modules/books/commands/manage-book/manage-book.handler';
import { UpdateBookCommand } from '@/modules/books/commands/update-book/update-book.command';
import { UpdateBookResult } from '@/modules/books/commands/update-book/update-book.result';
import { CreateUpdateBookResultDto } from '@/modules/books/dto/create-update-book.dto';
import { Book } from '@/modules/books/entities/book.entity';
import { BookNotFoundError } from '@/modules/books/errors/book-not-found.error';
import { BookViewModel } from '@/modules/books/vms/book.vm';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(UpdateBookCommand)
export class UpdateBookHandler
  extends ManageBookHandler
  implements ICommandHandler<UpdateBookCommand, UpdateBookResult>
{
  async execute(command: UpdateBookCommand): Promise<UpdateBookResult> {
    const book = await this.findBook(command);
    if (book == null) {
      throw new BookNotFoundError(command.bookId);
    }

    await this.tryAssigningPublisher(command.publisher);
    await this.tryAssigningAuthors(command.authors);
    await this.tryAssigningGenre(command.genre);
    await this.tryAssigningLanguage(command.language);
    await this.tryAssigningTags(command.tags);

    this.updateBook(book, command);

    const result = new CreateUpdateBookResultDto(new BookViewModel(book));

    return new UpdateBookResult(result);
  }

  private findBook(command: UpdateBookCommand): Promise<Book> {
    return this.bookRepository.findOne(command.bookId);
  }

  private updateBook(book: Book, command: UpdateBookCommand): void {
    // @TODO
  }
}
