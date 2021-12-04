import { FindBooksFilterDto } from '@/modules/books/dto/find-books-filter.dto';
import { Book } from '@/modules/books/entities/book.entity';
import { Injectable } from '@nestjs/common';
import { Equal, ILike, In } from 'typeorm';

@Injectable()
export class BookRepository {
  /**
   * Pobiera wszystkie książki na podstawie podanego filtra.
   */
  async findAll(filter?: FindBooksFilterDto): Promise<Book[]> {
    const query = Book.createQueryBuilder();

    if (filter != null) {
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
    }

    return query.getMany();
  }

  /**
   * Pobiera książkę na podstawie id.
   */
  async findOne(id: string): Promise<Book> {
    return Book.findOne(id);
  }

  /**
   * Sprawdza, czy książka o podanym ISBN już istnieje.
   */
  async isBookExists(isbn: string): Promise<boolean> {
    return (await Book.findOne({ isbn: Equal(isbn) })) != null;
  }

  /**
   * Zapisuje książkę do bazy danych.
   */
  async persist(book: Book): Promise<Book> {
    return book.save();
  }

  /**
   * Usuwa książkę z bazy danych.
   */
  async remove(book: Book): Promise<Book> {
    return book.softRemove();
  }
}
