import { CreateBook } from '@/modules/books/dto/create-book.dto';
import { UpdateBook } from '@/modules/books/dto/update-book.dto';
import { Book } from '@/modules/books/entities/book.entity';
import { BookAlreadyExistsError } from '@/modules/books/errors/book-already-exists.error';
import { BookNotFoundError } from '@/modules/books/errors/book-not-found.error';
import { BooksFilter } from '@/modules/books/filters/books.filter';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, ILike, In, Repository } from 'typeorm';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly booksRepository: Repository<Book>,
  ) {}

  async create(dto: CreateBook) {
    const book = await this.booksRepository.findOne({ isbn: Equal(dto.isbn) });
    if (book != null) {
      throw new BookAlreadyExistsError(dto.isbn);
    }

    return this.booksRepository.save(dto.toEntity());
  }

  async update(dto: UpdateBook) {
    const book = await this.booksRepository.findOne(dto.id);
    if (book == null) {
      throw new BookNotFoundError(dto.id);
    }

    return this.booksRepository.update(dto.id, dto.toEntity());
  }

  async remove(id: number) {
    const book = await this.booksRepository.findOne(id);
    if (book == null) {
      throw new BookNotFoundError(id);
    }

    return this.booksRepository.delete(id);
  }

  findAll(filter: BooksFilter): Promise<Book[]> {
    const query = this.booksRepository.createQueryBuilder();

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

  findOne(id: number): Promise<Book> {
    return this.booksRepository.findOne(id, {
      relations: ['publisher', 'authors', 'genre', 'language', 'tags'],
      loadRelationIds: {
        relations: ['copies', 'ratings'],
      },
    });
  }
}
