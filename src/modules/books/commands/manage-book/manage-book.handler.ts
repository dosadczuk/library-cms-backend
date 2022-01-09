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

  protected async findPublisher(
    publisher: CreateUpdatePublisherBodyDto,
  ): Promise<Publisher | null> {
    if (publisher.id != null) {
      const foundPublisher = await this.publisherRepository.findOne(publisher.id);
      if (foundPublisher != null) {
        return foundPublisher;
      }
    }

    return this.publisherRepository.findByName(publisher.name);
  }

  protected async findAuthor(author: CreateUpdateAuthorBodyDto): Promise<Author | null> {
    if (author.id != null) {
      const foundAuthor = await this.authorRepository.findOne(author.id);
      if (foundAuthor != null) {
        return foundAuthor;
      }
    }

    return this.authorRepository.findByNames(author.firstName, author.lastName);
  }

  protected async findGenre(genre: CreateUpdateGenreBodyDto): Promise<Genre | null> {
    if (genre.id != null) {
      const foundGenre = await this.genreRepository.findOne(genre.id);
      if (foundGenre != null) {
        return foundGenre;
      }
    }

    return this.genreRepository.findByValue(genre.value);
  }

  protected async findLanguage(language: CreateUpdateLanguageBodyDto): Promise<Language | null> {
    if (language.id != null) {
      const foundLanguage = await this.languageRepository.findOne(language.id);
      if (foundLanguage != null) {
        return foundLanguage;
      }
    }

    return this.languageRepository.findByValue(language.value);
  }

  protected async findTag(tag: CreateUpdateTagBodyDto): Promise<Tag | null> {
    if (tag.id != null) {
      const foundTag = await this.tagRepository.findOne(tag.id);
      if (foundTag != null) {
        return foundTag;
      }
    }

    return this.tagRepository.findByValue(tag.value);
  }

  protected async findImage(id: string): Promise<File | null> {
    return this.fileRepository.findOne(id);
  }
}
