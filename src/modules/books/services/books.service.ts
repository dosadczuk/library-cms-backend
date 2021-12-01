import { CreateBook } from '@/modules/books/dto/create-book.dto';
import { CreateOrUpdateAuthor } from '@/modules/books/dto/create-or-update-author.dto';
import { CreateOrUpdateGenre } from '@/modules/books/dto/create-or-update-genre.dto';
import { CreateOrUpdateLanguage } from '@/modules/books/dto/create-or-update-language.dto';
import { CreateOrUpdatePublisher } from '@/modules/books/dto/create-or-update-publisher.dto';
import { CreateOrUpdateTag } from '@/modules/books/dto/create-or-update-tag.dto';
import { UpdateBook } from '@/modules/books/dto/update-book.dto';
import { Book } from '@/modules/books/entities/book.entity';
import { BookAlreadyExistsError } from '@/modules/books/errors/book-already-exists.error';
import { BookNotFoundError } from '@/modules/books/errors/book-not-found.error';
import { BooksFilter } from '@/modules/books/filters/books.filter';
import { AuthorRepository } from '@/modules/books/repositories/author.repository';
import { BookRepository } from '@/modules/books/repositories/book.repository';
import { GenreRepository } from '@/modules/books/repositories/genre.repository';
import { LanguageRepository } from '@/modules/books/repositories/language.repository';
import { PublisherRepository } from '@/modules/books/repositories/publisher.repository';
import { TagRepository } from '@/modules/books/repositories/tag.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, ILike, In } from 'typeorm';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(AuthorRepository)
    private readonly authorRepository: AuthorRepository,
    @InjectRepository(BookRepository)
    private readonly bookRepository: BookRepository,
    @InjectRepository(GenreRepository)
    private readonly genreRepository: GenreRepository,
    @InjectRepository(LanguageRepository)
    private readonly languageRepository: LanguageRepository,
    @InjectRepository(PublisherRepository)
    private readonly publisherRepository: PublisherRepository,
    @InjectRepository(TagRepository)
    private readonly tagRepository: TagRepository,
  ) {}

  async create(dto: CreateBook) {
    const book = await this.bookRepository.findOne({ isbn: Equal(dto.isbn) });
    if (book != null) {
      throw new BookAlreadyExistsError(dto.isbn);
    }

    await this.tryAssigningPublisher(dto.publisher);
    await this.tryAssigningAuthors(dto.authors);
    await this.tryAssigningGenre(dto.genre);
    await this.tryAssigningLanguage(dto.language);
    await this.tryAssigningTags(dto.tags);

    return this.bookRepository.save(dto.toEntity());
  }

  async update(dto: UpdateBook) {
    const book = await this.bookRepository.findOne(dto.id);
    if (book == null) {
      throw new BookNotFoundError(dto.id);
    }

    await this.tryAssigningPublisher(dto.publisher);
    await this.tryAssigningAuthors(dto.authors);
    await this.tryAssigningGenre(dto.genre);
    await this.tryAssigningLanguage(dto.language);
    await this.tryAssigningTags(dto.tags);

    return this.bookRepository.update(dto.id, dto.toEntity());
  }

  async tryAssigningPublisher(publisher: CreateOrUpdatePublisher) {
    if (publisher.id != null) {
      return; // już dopasowany
    }

    const entity = await this.publisherRepository.findByName(publisher.name);
    if (entity == null) {
      return; // nie istnieje
    }

    publisher.id = entity.id;
  }

  async tryAssigningAuthors(authors: CreateOrUpdateAuthor[]) {
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

  async tryAssigningGenre(genre: CreateOrUpdateGenre) {
    if (genre.id != null) {
      return; // już dopasowany
    }

    const entity = await this.genreRepository.findByValue(genre.value);
    if (entity == null) {
      return; // nie istnieje
    }

    genre.id = entity.id;
  }

  async tryAssigningLanguage(language: CreateOrUpdateLanguage) {
    if (language.id != null) {
      return; // już dopasowany
    }

    const entity = await this.languageRepository.findByValue(language.value);
    if (entity == null) {
      return; // nie istnieje
    }

    language.id = entity.id;
  }

  async tryAssigningTags(tags: CreateOrUpdateTag[]) {
    for (const tag of tags) {
      if (tag.id != null) {
        continue; // już dopasowany
      }

      const entity = await this.tagRepository.findByValue(tag.value);
      if (entity == null) {
        continue; // nie istnieje
      }

      tag.id = entity.id;
    }
  }

  async remove(id: number) {
    const book = await this.bookRepository.findOne(id);
    if (book == null) {
      throw new BookNotFoundError(id);
    }

    return this.bookRepository.delete(id);
  }

  findAll(filter: BooksFilter): Promise<Book[]> {
    const query = this.bookRepository.createQueryBuilder();

    if (filter.title != null) {
      query.andWhere({ title: ILike(`%${filter.title}%`) });
    }

    if (filter.type != null) {
      query.andWhere({ type: Equal(filter.type) });
    }

    if (filter.genreIds != null) {
      query.andWhere({ genre: In(filter.genreIds) });
    }

    if (filter.languageIds != null) {
      query.andWhere({ language: In(filter.languageIds) });
    }

    return query.getMany();
  }

  async findOne(id: number): Promise<Book> {
    const book = await this.bookRepository.findOne(id);
    if (book == null) {
      throw new BookNotFoundError(id);
    }

    return book;
  }
}
