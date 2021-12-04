import { CreateBookCommand } from '@/modules/books/commands/create-book/create-book.command';
import { CreateBookResult } from '@/modules/books/commands/create-book/create-book.result';
import { ManageBookHandler } from '@/modules/books/commands/manage-book/manage-book.handler';
import { CreateUpdateBookResultDto } from '@/modules/books/dto/create-update-book.dto';
import { Author } from '@/modules/books/entities/author.entity';
import { Book } from '@/modules/books/entities/book.entity';
import { Genre } from '@/modules/books/entities/genre.entity';
import { Language } from '@/modules/books/entities/language.entity';
import { Publisher } from '@/modules/books/entities/publisher.entity';
import { Tag } from '@/modules/books/entities/tag.entity';
import { BookAlreadyExistsError } from '@/modules/books/errors/book-already-exists.error';
import { File } from '@/modules/files/entities/file.entity';
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

    await this.tryAssigningPublisher(command.publisher);
    await this.tryAssigningAuthors(command.authors);
    await this.tryAssigningGenre(command.genre);
    await this.tryAssigningLanguage(command.language);
    await this.tryAssigningTags(command.tags);

    const book = this.createBook(command);

    await this.bookRepository.persist(book);

    return new CreateBookResult(new CreateUpdateBookResultDto(book));
  }

  private async isBookExists(command: CreateBookCommand): Promise<boolean> {
    return this.bookRepository.isBookExists(command.book.isbn);
  }

  private createBook(command: CreateBookCommand): Book {
    const book = new Book();
    book.isbn = command.book.isbn;
    book.type = command.book.type;
    book.title = command.book.title;
    book.description = command.book.description;
    book.issueDate = command.book.issueDate;
    book.pages = command.book.pages;
    book.details = command.book.details;

    book.publisher = new Publisher();
    book.publisher.id = command.publisher.id;
    book.publisher.name = command.publisher.name;

    book.authors = command.authors.map((it) => {
      const author = new Author();
      author.id = it.id;
      author.firstName = it.firstName;
      author.lastName = it.lastName;

      return author;
    });

    book.genre = new Genre();
    book.genre.id = command.genre.id;
    book.genre.value = command.genre.value;

    book.language = new Language();
    book.language.id = command.language.id;
    book.language.value = command.language.value;

    book.image = new File();
    book.image.id = command.book.imageId;

    book.tags = command.tags.map((it) => {
      const tag = new Tag();
      tag.id = it.id;
      tag.value = it.value;

      return tag;
    });

    return book;
  }
}
