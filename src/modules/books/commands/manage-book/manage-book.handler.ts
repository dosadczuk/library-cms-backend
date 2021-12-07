import { CreateUpdateAuthorBodyDto } from '@/modules/books/dto/create-update-author.dto';
import { CreateUpdateGenreBodyDto } from '@/modules/books/dto/create-update-genre.dto';
import { CreateUpdateLanguageBodyDto } from '@/modules/books/dto/create-update-language.dto';
import { CreateUpdatePublisherBodyDto } from '@/modules/books/dto/create-update-publisher.dto';
import { CreateUpdateTagBodyDto } from '@/modules/books/dto/create-update-tag.dto';
import { AuthorRepository } from '@/modules/books/repositories/author.repository';
import { BookRepository } from '@/modules/books/repositories/book.repository';
import { GenreRepository } from '@/modules/books/repositories/genre.repository';
import { LanguageRepository } from '@/modules/books/repositories/language.repository';
import { PublisherRepository } from '@/modules/books/repositories/publisher.repository';
import { TagRepository } from '@/modules/books/repositories/tag.repository';

export abstract class ManageBookHandler {
  constructor(
    protected readonly authorRepository: AuthorRepository,
    protected readonly bookRepository: BookRepository,
    protected readonly genreRepository: GenreRepository,
    protected readonly languageRepository: LanguageRepository,
    protected readonly publisherRepository: PublisherRepository,
    protected readonly tagRepository: TagRepository,
  ) {}

  protected async tryAssigningPublisher(
    publisher: CreateUpdatePublisherBodyDto,
  ): Promise<void> {
    if (publisher.id != null) {
      return; // już dopasowany
    }

    const entity = await this.publisherRepository.findByName(publisher.name);
    if (entity == null) {
      return; // nie istnieje
    }

    publisher.id = entity.id;
  }

  protected async tryAssigningAuthors(
    authors: CreateUpdateAuthorBodyDto[],
  ): Promise<void> {
    for (const author of authors) {
      if (author.id != null) {
        continue; // już dopasowany
      }

      const entity = await this.authorRepository.findByNames(
        author.firstName,
        author.lastName,
      );

      if (entity == null) {
        continue; // nie istnieje
      }

      author.id = entity.id;
    }
  }

  protected async tryAssigningGenre(
    genre: CreateUpdateGenreBodyDto,
  ): Promise<void> {
    if (genre.id != null) {
      return; // już dopasowany
    }

    const entity = await this.genreRepository.findByValue(genre.value);
    if (entity == null) {
      return; // nie istnieje
    }

    genre.id = entity.id;
  }

  protected async tryAssigningLanguage(
    language: CreateUpdateLanguageBodyDto,
  ): Promise<void> {
    if (language.id != null) {
      return; // już dopasowany
    }

    const entity = await this.languageRepository.findByValue(language.value);
    if (entity == null) {
      return; // nie istnieje
    }

    language.id = entity.id;
  }

  protected async tryAssigningTags(
    tags: CreateUpdateTagBodyDto[],
  ): Promise<void> {
    for (const tag of tags) {
      if (tag.id != null) {
        continue; // już dopasowany
      }

      const entity = await this.tagRepository.findByNames(tag.value);
      if (entity == null) {
        continue; // nie istnieje
      }

      tag.id = entity.id;
    }
  }
}
