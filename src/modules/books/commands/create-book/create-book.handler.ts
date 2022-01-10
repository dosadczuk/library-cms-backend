import { CreateBookCommand } from '@/modules/books/commands/create-book/create-book.command';
import { CreateBookResult } from '@/modules/books/commands/create-book/create-book.result';
import { ManageBookHandler } from '@/modules/books/commands/manage-book/manage-book.handler';
import { CreateUpdateBookResultDto } from '@/modules/books/dto';
import { Book, Copy } from '@/modules/books/entities';
import { BookAlreadyExistsError } from '@/modules/books/errors';
import { BookViewModel } from '@/modules/books/vms';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(CreateBookCommand)
export class CreateBookHandler
  extends ManageBookHandler
  implements ICommandHandler<CreateBookCommand, CreateBookResult>
{
  async execute(command: CreateBookCommand): Promise<CreateBookResult> {
    if (await this.isBookExists(command)) {
      throw new BookAlreadyExistsError(command.book.isbn);
    }

    const book = await this.createBook(command);

    await this.bookRepository.persist(book);

    const result = new CreateUpdateBookResultDto(new BookViewModel(book));

    return new CreateBookResult(result);
  }

  private async isBookExists(command: CreateBookCommand): Promise<boolean> {
    return this.bookRepository.isBookExists(command.book.isbn);
  }

  private async createBook(command: CreateBookCommand): Promise<Book> {
    const book = new Book();
    book.isbn = command.book.isbn;
    book.type = command.book.type;
    book.title = command.book.title;
    book.description = command.book.description;
    book.issueDate = command.book.issueDate;
    book.publisher = await this.findOrCreatePublisher(command);
    book.authors = await this.findOrCreateAuthors(command);
    book.genre = await this.findOrCreateGenre(command);
    book.language = await this.findOrCreateLanguage(command);
    book.pages = command.book.pages;
    book.details = command.book.details;
    book.tags = await this.findOrCreateTags(command);
    book.copies = await this.createCopies(command);

    if (command.book.imageId != null) {
      book.image = await this.createImage(command.book.imageId);
    }

    return book;
  }

  protected async createCopies(command: CreateBookCommand): Promise<Copy[]> {
    const copies: Copy[] = [];
    for (const it of command.copies) {
      const copy = new Copy();
      copy.number = it.number;

      copies.push(copy);
    }

    return copies;
  }
}
