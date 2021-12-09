import { FindBooksResultDto } from '@/modules/books/dto/find-books.dto';
import { FindBooksQuery } from '@/modules/books/queries/find-books/find-books.query';
import { FindBooksResult } from '@/modules/books/queries/find-books/find-books.result';
import { BookRepository } from '@/modules/books/repositories/book.repository';
import { BookViewModel } from '@/modules/books/vms/book.vm';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(FindBooksQuery)
export class FindBooksHandler implements IQueryHandler<FindBooksQuery, FindBooksResult> {
  constructor(private readonly bookRepository: BookRepository) {}

  async execute(query: FindBooksQuery): Promise<FindBooksResult> {
    const books = await this.findBooks(query);

    const result = new FindBooksResultDto(books);

    return new FindBooksResult(result);
  }

  private async findBooks(query: FindBooksQuery): Promise<BookViewModel[]> {
    const books = await this.bookRepository.findAll(query.filter);

    return books.map((it) => new BookViewModel(it));
  }
}
