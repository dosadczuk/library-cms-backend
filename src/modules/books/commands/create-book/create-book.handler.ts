import { CreateBookCommand } from '@/modules/books/commands/create-book/create-book.command';
import { CreateBookResult } from '@/modules/books/commands/create-book/create-book.result';
import { ManageBookCommand } from '@/modules/books/commands/manage-book/manage-book.command';
import { ManageBookHandler } from '@/modules/books/commands/manage-book/manage-book.handler';
import { CreateUpdateBookResultDto } from '@/modules/books/dto';
import { Author, Book, Genre, Language, Publisher, Tag } from '@/modules/books/entities';
import { BookAlreadyExistsError } from '@/modules/books/errors';
import { BookViewModel } from '@/modules/books/vms';
import { File } from '@/modules/files/entities';
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
    book.publisher = await this.createPublisher(command);
    book.authors = await this.createAuthors(command);
    book.genre = await this.createGenre(command);
    book.language = await this.createLanguage(command);
    book.pages = command.book.pages;
    book.details = command.book.details;
    book.tags = await this.createTags(command);

    if (command.book.imageId != null) {
      book.image = new File();
      book.image.id = command.book.imageId;
    }

    return book;
  }

  private async createPublisher(command: ManageBookCommand): Promise<Publisher> {
    if (command.publisher.id == null) {
      await this.tryAssigningPublisher(command.publisher);
    }

    const publisher = new Publisher();
    publisher.id = command.publisher.id;
    publisher.name = command.publisher.name;

    return publisher;
  }

  private async createAuthors(command: ManageBookCommand): Promise<Author[]> {
    const authors: Author[] = [];
    for (const it of command.authors) {
      if (it.id == null) {
        await this.tryAssigningAuthor(it);
      }

      const author = new Author();
      author.id = it.id;
      author.firstName = it.firstName;
      author.lastName = it.lastName;

      authors.push(author);
    }

    return authors;
  }

  private async createGenre(command: ManageBookCommand): Promise<Genre> {
    if (command.genre.id == null) {
      await this.tryAssigningGenre(command.genre);
    }

    const genre = new Genre();
    genre.id = command.genre.id;
    genre.value = command.genre.value;

    return genre;
  }

  private async createLanguage(command: ManageBookCommand): Promise<Language> {
    if (command.language.id == null) {
      await this.tryAssigningLanguage(command.language);
    }

    const language = new Language();
    language.id = command.language.id;
    language.value = command.language.value;

    return language;
  }

  private async createTags(command: ManageBookCommand): Promise<Tag[]> {
    const tags: Tag[] = [];
    for (const it of command.tags) {
      if (it.id == null) {
        await this.tryAssigningTag(it);
      }

      const tag = new Tag();
      tag.id = it.id;
      tag.value = it.value;

      tags.push(tag);
    }

    return tags;
  }
}
