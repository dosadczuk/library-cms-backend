import { ManageBookHandler } from '@/modules/books/commands/manage-book/manage-book.handler';
import { UpdateBookCommand } from '@/modules/books/commands/update-book/update-book.command';
import { UpdateBookResult } from '@/modules/books/commands/update-book/update-book.result';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Author, Book, Copy, Genre, Language, Publisher, Tag } from '@/modules/books/entities';
import { BookNotFoundError } from '@/modules/books/errors';
import { File } from '@/modules/files/entities';
import { CreateBookCopyBodyDto, CreateUpdateBookResultDto } from '@/modules/books/dto';
import { BookViewModel } from '@/modules/books/vms';

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

    await this.updateBook(book, command);

    await this.bookRepository.persist(book);

    const result = new CreateUpdateBookResultDto(new BookViewModel(book));

    return new UpdateBookResult(result);
  }

  private async findBook(command: UpdateBookCommand): Promise<Book> {
    return this.bookRepository.findOne(command.bookId);
  }

  private async updateBook(book: Book, command: UpdateBookCommand): Promise<void> {
    book.type = command.book.type ?? book.type;
    book.title = command.book.title ?? book.title;
    book.description = command.book.description ?? book.description;
    book.issueDate = command.book.issueDate ?? book.issueDate;
    book.publisher = (await this.createOrUpdatePublisher(command)) ?? book.publisher;
    book.authors = (await this.createOrUpdateAuthors(command)) ?? book.authors;
    book.genre = (await this.createOrUpdateGenre(command)) ?? book.genre;
    book.language = (await this.createOrUpdateLanguage(command)) ?? book.language;
    book.pages = command.book.pages ?? book.pages;
    book.details = command.book.details ?? book.details;
    book.tags = (await this.createOrUpdateTags(command)) ?? book.tags;
    book.copies = (await this.createOrUpdateCopies(command)) ?? book.copies;

    if (command.book.imageId != null) {
      book.image = (await this.createOrUpdateImage(command)) ?? book.image;
    }
  }

  private async createOrUpdatePublisher(command: UpdateBookCommand): Promise<Publisher> {
    if (command.publisher == null) {
      return undefined;
    }

    return this.findOrCreatePublisher(command);
  }

  private async createOrUpdateAuthors(command: UpdateBookCommand): Promise<Author[]> {
    if (command.authors == null) {
      return undefined;
    }

    return this.findOrCreateAuthors(command);
  }

  private async createOrUpdateGenre(command: UpdateBookCommand): Promise<Genre> {
    if (command.genre == null) {
      return undefined;
    }

    return this.findOrCreateGenre(command);
  }

  private async createOrUpdateLanguage(command: UpdateBookCommand): Promise<Language> {
    if (command.language == null) {
      return undefined;
    }

    return this.findOrCreateLanguage(command);
  }

  private async createOrUpdateTags(command: UpdateBookCommand): Promise<Tag[]> {
    if (command.tags == null) {
      return undefined;
    }

    return this.findOrCreateTags(command);
  }

  private async createOrUpdateCopies(command: UpdateBookCommand): Promise<Copy[]> {
    if (command.copies == null) {
      return undefined;
    }

    const copies: Copy[] = [];
    for (const it of command.copies) {
      const foundCopy = await this.findCopy(it);
      if (foundCopy != null) {
        copies.push(foundCopy);
        continue;
      }

      // jak nie ma to tworzymy
      const copy = new Copy();
      copy.number = it.number;

      copies.push(copy);
    }

    return copies;
  }

  private async createOrUpdateImage(command: UpdateBookCommand): Promise<File | null> {
    if (command.book.imageId == null) {
      return undefined;
    }

    return this.createImage(command.book.imageId);
  }

  private async findCopy(copy: CreateBookCopyBodyDto): Promise<Copy | null> {
    return this.bookRepository.findBookCopyByNumber(copy.number);
  }
}
