import {
  CreateBook,
  CreateOrUpdateAuthor,
  CreateOrUpdateGenre,
  CreateOrUpdateLanguage,
  CreateOrUpdatePublisher,
  CreateOrUpdateTag,
  UpdateBook,
} from '@/modules/books/dto';
import {
  Author,
  Book,
  Genre,
  Language,
  Publisher,
  Tag,
} from '@/modules/books/entities';
import { BookAlreadyExistsError } from '@/modules/books/errors/book-already-exists.error';
import { BookNotFoundError } from '@/modules/books/errors/book-not-found.error';
import { BooksFilter } from '@/modules/books/filters';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, ILike, In, Repository } from 'typeorm';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
    @InjectRepository(Language)
    private readonly languageRepository: Repository<Language>,
    @InjectRepository(Publisher)
    private readonly publisherRepository: Repository<Publisher>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
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

  async update(id: string, dto: UpdateBook) {
    const book = await this.bookRepository.findOne(id);
    if (book == null) {
      throw new BookNotFoundError(id);
    }

    await this.tryAssigningPublisher(dto.publisher);
    await this.tryAssigningAuthors(dto.authors);
    await this.tryAssigningGenre(dto.genre);
    await this.tryAssigningLanguage(dto.language);
    await this.tryAssigningTags(dto.tags);

    return this.bookRepository.update(id, dto.toEntity());
  }

  async tryAssigningPublisher(publisher: CreateOrUpdatePublisher) {
    if (publisher.id != null) {
      return; // już dopasowany
    }

    const entity = await this.publisherRepository.findOne({
      where: { name: ILike(publisher.name) },
    });

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

      const entity = await this.authorRepository.findOne({
        where: {
          firstName: ILike(author.firstName), // bez %...%
          lastName: ILike(author.lastName), // bez %...%
        },
      });

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

    const entity = await this.genreRepository.findOne({
      where: { value: ILike(genre.value) },
    });

    if (entity == null) {
      return; // nie istnieje
    }

    genre.id = entity.id;
  }

  async tryAssigningLanguage(language: CreateOrUpdateLanguage) {
    if (language.id != null) {
      return; // już dopasowany
    }

    const entity = await this.languageRepository.findOne({
      where: { value: ILike(language.value) },
    });

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

      const entity = await this.tagRepository.findOne({
        where: { value: ILike(tag.value) },
      });

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

    return this.bookRepository.softDelete(id);
  }

  findAllWith(filter: BooksFilter): Promise<Book[]> {
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

  async findById(id: number): Promise<Book> {
    const book = await this.bookRepository.findOne(id, {
      loadRelationIds: {
        relations: ['copies', 'ratings'],
      },
    });

    if (book == null) {
      throw new BookNotFoundError(id);
    }

    return book;
  }
}
