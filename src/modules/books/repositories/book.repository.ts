import { FindBooksFilterDto } from '@/modules/books/dto';
import { Book, Copy } from '@/modules/books/entities';
import { Injectable } from '@nestjs/common';
import { Equal, ILike, In } from 'typeorm';

@Injectable()
export class BookRepository {
  /**
   * Pobiera wszystkie książki na podstawie podanego filtra.
   */
  async findAll(filter?: FindBooksFilterDto): Promise<Book[]> {
    const query = Book.createQueryBuilder('book');
    query.leftJoinAndSelect('book.publisher', 'publisher');
    query.leftJoinAndSelect('book.authors', 'authors');
    query.leftJoinAndSelect('book.genre', 'genre');
    query.leftJoinAndSelect('book.language', 'language');
    query.leftJoinAndSelect('book.tags', 'tags');

    if (filter != null) {
      if (filter.title != null) {
        query.andWhere({ 'book.title': ILike(`%${filter.title}%`) });
      }

      if (filter.type != null) {
        query.andWhere({ 'book.type': Equal(filter.type) });
      }

      if (filter.genreIds != null) {
        query.andWhere({ 'book.genre': In(filter.genreIds) });
      }

      if (filter.languageIds != null) {
        query.andWhere({ 'book.language': In(filter.languageIds) });
      }
    }

    return query.getMany();
  }

  /**
   * Pobiera książkę na podstawie id.
   */
  async findOne(id: number): Promise<Book | null> {
    return Book.findOne(id);
  }

  /**
   * Pobiera egzemplarze książki.
   */
  async findCopies(bookId: number): Promise<Copy[]> {
    return Copy.find({ where: { book: { id: Equal(bookId) } } });
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
