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

@Injectable()
export abstract class ManageBookHandler {
  constructor(
    protected readonly authorRepository: AuthorRepository,
    protected readonly bookRepository: BookRepository,
    protected readonly genreRepository: GenreRepository,
    protected readonly languageRepository: LanguageRepository,
    protected readonly publisherRepository: PublisherRepository,
    protected readonly tagRepository: TagRepository,
  ) {}

  protected async findPublisher(publisher: CreateUpdatePublisherBodyDto): Promise<Publisher> {
    return this.publisherRepository.findByName(publisher.name);
  }

  protected async findAuthor(author: CreateUpdateAuthorBodyDto): Promise<Author> {
    return this.authorRepository.findByNames(author.firstName, author.lastName);
  }

  protected async findGenre(genre: CreateUpdateGenreBodyDto): Promise<Genre> {
    return this.genreRepository.findByValue(genre.value);
  }

  protected async findLanguage(language: CreateUpdateLanguageBodyDto): Promise<Language> {
    return this.languageRepository.findByValue(language.value);
  }

  protected async findTag(tag: CreateUpdateTagBodyDto): Promise<Tag> {
    return this.tagRepository.findByNames(tag.value);
  }
}
