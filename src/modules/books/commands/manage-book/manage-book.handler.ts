import {
  CreateUpdateAuthorBodyDto,
  CreateUpdateGenreBodyDto,
  CreateUpdateLanguageBodyDto,
  CreateUpdatePublisherBodyDto,
  CreateUpdateTagBodyDto,
} from '@/modules/books/dto';
import {
  AuthorRepository,
  BookRepository,
  GenreRepository,
  LanguageRepository,
  PublisherRepository,
  TagRepository,
} from '@/modules/books/repositories';
import { Injectable } from '@nestjs/common';
import { Author, Genre, Language, Publisher, Tag } from '@/modules/books/entities';
import { FileRepository } from '@/modules/files/repositories';
import { File } from '@/modules/files/entities';
import { ManageBookCommand } from '@/modules/books/commands/manage-book/manage-book.command';

@Injectable()
export abstract class ManageBookHandler {
  constructor(
    protected readonly authorRepository: AuthorRepository,
    protected readonly bookRepository: BookRepository,
    protected readonly genreRepository: GenreRepository,
    protected readonly languageRepository: LanguageRepository,
    protected readonly publisherRepository: PublisherRepository,
    protected readonly tagRepository: TagRepository,
    protected readonly fileRepository: FileRepository,
  ) {}

  protected async findOrCreatePublisher(command: ManageBookCommand): Promise<Publisher> {
    const foundPublisher = await this.findPublisher(command.publisher);
    if (foundPublisher != null) {
      return foundPublisher;
    }

    const newPublisher = new Publisher();
    newPublisher.name = command.publisher.name;

    return newPublisher;
  }

  private async findPublisher(publisher: CreateUpdatePublisherBodyDto): Promise<Publisher | null> {
    if (publisher.id != null) {
      const foundPublisher = await this.publisherRepository.findOne(publisher.id);
      if (foundPublisher != null) {
        return foundPublisher;
      }
    }

    return this.publisherRepository.findByName(publisher.name);
  }

  protected async findOrCreateAuthors(command: ManageBookCommand): Promise<Author[]> {
    const authors: Author[] = [];
    for (const it of command.authors) {
      const foundAuthor = await this.findAuthor(it);
      if (foundAuthor != null) {
        authors.push(foundAuthor);
        continue;
      }

      // jak nie ma to tworzymy
      const author = new Author();
      author.firstName = it.firstName;
      author.lastName = it.lastName;

      authors.push(author);
    }

    return authors;
  }

  private async findAuthor(author: CreateUpdateAuthorBodyDto): Promise<Author | null> {
    if (author.id != null) {
      const foundAuthor = await this.authorRepository.findOne(author.id);
      if (foundAuthor != null) {
        return foundAuthor;
      }
    }

    return this.authorRepository.findByNames(author.firstName, author.lastName);
  }

  protected async findOrCreateGenre(command: ManageBookCommand): Promise<Genre> {
    const foundGenre = await this.findGenre(command.genre);
    if (foundGenre != null) {
      return foundGenre;
    }

    // jak nie ma to tworzymy
    const genre = new Genre();
    genre.value = command.genre.value;

    return genre;
  }

  private async findGenre(genre: CreateUpdateGenreBodyDto): Promise<Genre | null> {
    if (genre.id != null) {
      const foundGenre = await this.genreRepository.findOne(genre.id);
      if (foundGenre != null) {
        return foundGenre;
      }
    }

    return this.genreRepository.findByValue(genre.value);
  }

  protected async findOrCreateLanguage(command: ManageBookCommand): Promise<Language> {
    const foundLanguage = await this.findLanguage(command.language);
    if (foundLanguage != null) {
      return foundLanguage;
    }

    // jak nie ma to tworzymy
    const language = new Language();
    language.value = command.language.value;

    return language;
  }

  private async findLanguage(language: CreateUpdateLanguageBodyDto): Promise<Language | null> {
    if (language.id != null) {
      const foundLanguage = await this.languageRepository.findOne(language.id);
      if (foundLanguage != null) {
        return foundLanguage;
      }
    }

    return this.languageRepository.findByValue(language.value);
  }

  protected async findOrCreateTags(command: ManageBookCommand): Promise<Tag[]> {
    const tags: Tag[] = [];
    for (const it of command.tags) {
      const foundTag = await this.findTag(it);
      if (foundTag != null) {
        tags.push(foundTag);
        continue;
      }

      // jak nie ma to tworzymy
      const tag = new Tag();
      tag.value = it.value;

      tags.push(tag);
    }

    return tags;
  }

  private async findTag(tag: CreateUpdateTagBodyDto): Promise<Tag | null> {
    if (tag.id != null) {
      const foundTag = await this.tagRepository.findOne(tag.id);
      if (foundTag != null) {
        return foundTag;
      }
    }

    return this.tagRepository.findByValue(tag.value);
  }

  protected async createImage(imageId: string): Promise<File | null> {
    return this.fileRepository.findOne(imageId);
  }
}
