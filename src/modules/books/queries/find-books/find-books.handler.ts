import { FindBooksResultDto } from '@/modules/books/dto/find-books-filter.dto';
import { Book } from '@/modules/books/entities/book.entity';
import { FindBooksQuery } from '@/modules/books/queries/find-books/find-books.query';
import { FindBooksResult } from '@/modules/books/queries/find-books/find-books.result';
import { BookRepository } from '@/modules/books/repositories/book.repository';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(FindBooksQuery)
export class FindBooksHandler
  implements IQueryHandler<FindBooksQuery, FindBooksResult>
{
  constructor(private readonly bookRepository: BookRepository) {}

  async execute(query: FindBooksQuery): Promise<FindBooksResult> {
    const books = await this.findBooks(query);

    const result = new FindBooksResultDto();
    result.books = books;

    return new FindBooksResult(result);
  }

  private async findBooks(query: FindBooksQuery): Promise<Book[]> {
    return this.bookRepository.findAll(query.filter);
  }
}
