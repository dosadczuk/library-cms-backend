import { FindBooksFilterDto } from '@/modules/books/dto';
import { Book, Borrow, Copy } from '@/modules/books/entities';
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
   * Pobiera książkę na podstawie bookId.
   */
  async findOne(id: number): Promise<Book | null> {
    return Book.findOne(id);
  }

  /**
   * Pobiera egzemplarze książki.
   */
  async findBookCopies(bookId: number): Promise<Copy[]> {
    return Copy.find({ where: { book: { id: Equal(bookId) } } });
  }

  /**
   * Pobiera egzemplarz książki.
   */
  async findBookCopy(bookId: number, copyId: number): Promise<Copy | null> {
    return Copy.findOne({
      where: {
        id: Equal(copyId),
        book: { id: Equal(bookId) },
      },
    });
  }

  /**
   * Pobiera wypożyczenie egzemplarza książki.
   */
  async findCopyBorrow(copyId: number, borrowId: number): Promise<Borrow | null> {
    return Borrow.findOne({
      where: {
        id: Equal(borrowId),
        copy: { id: Equal(copyId) },
      },
    });
  }

  /**
   * Sprawdza, czy książka o podanym ISBN już istnieje.
   */
  async isBookExists(isbn: string): Promise<boolean> {
    return (await Book.findOne({ isbn: Equal(isbn) })) != null;
  }

  /**
   * Sprawdza, czy egzemplarz książki istnieje.
   */
  async isBookCopyExists(bookId: number, number: string): Promise<boolean> {
    const copy = Copy.findOne({
      where: {
        number: Equal(number),
        book: { id: Equal(bookId) },
      },
    });

    return copy != null;
  }

  /**
   * Zapisuje książkę do bazy danych.
   */
  async persist(book: Book): Promise<Book> {
    return book.save();
  }

  /**
   * Zapisuje egzemplarz do bazy danych.
   */
  async persistCopy(copy: Copy): Promise<Copy> {
    return copy.save();
  }

  /**
   * Zapisuje wypożyczenie do bazy danych.
   */
  async persistBorrow(borrow: Borrow): Promise<Borrow> {
    return borrow.save();
  }

  /**
   * Usuwa książkę z bazy danych.
   */
  async remove(book: Book): Promise<Book> {
    return book.softRemove();
  }

  /**
   * Usuwa egzemplarz książki.
   */
  async removeCopy(copy: Copy): Promise<Copy> {
    return copy.remove();
  }

  /**
   * Usuwa wypożyczenie egzemplarza książki.
   */
  async removeBorrow(borrow: Borrow): Promise<Borrow> {
    return borrow.remove();
  }
}
