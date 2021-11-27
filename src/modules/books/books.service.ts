import { Book } from '@/modules/books/entities/book.entity';
import { BooksFilter } from '@/modules/books/filters/books.filter';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, ILike, In, Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly booksRepository: Repository<Book>,
  ) {}

  create(createBookDto: CreateBookDto) {
    return 'This action adds a new book';
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

  remove(id: number) {
    return this.booksRepository.delete(id);
  }
}
