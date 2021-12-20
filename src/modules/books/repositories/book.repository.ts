import { FindBooksFilterDto } from '@/modules/books/dto';
import { Book, Borrow, Copy, Rating } from '@/modules/books/entities';
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
    return Copy.find({ where: { bookId: Equal(bookId) } });
  }

  /**
   * Pobiera egzemplarz książki.
   */
  async findBookCopy(bookId: number, copyId: number): Promise<Copy | null> {
    return Copy.findOne({
      where: {
        id: Equal(copyId),
        bookId: Equal(bookId),
      },
    });
  }

  /**
   * Pobiera wypożyczenia egzemplarza książki.
   */
  async findCopyBorrows(copyId: number): Promise<Borrow[]> {
    return Borrow.find({ where: { copyId: Equal(copyId) } });
  }

  /**
   * Pobiera wypożyczenie egzemplarza książki.
   */
  async findCopyBorrow(copyId: number, borrowId: number): Promise<Borrow | null> {
    return Borrow.findOne({
      where: {
        id: Equal(borrowId),
        copyId: Equal(copyId),
      },
    });
  }

  /**
   * Pobiera ocenę książki.
   */
  async findBookRating(bookId: number, ratingId: number): Promise<Rating | null> {
    return Rating.findOne({
      where: {
        id: Equal(ratingId),
        bookId: Equal(bookId),
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
    const copy = await Copy.findOne({
      where: {
        number: Equal(number),
        bookId: Equal(bookId),
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
   * Zapisuje ocenę do bazy danych.
   */
  async persistRating(rating: Rating): Promise<Rating> {
    return rating.save();
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

  /**
   * Usuwa ocenę książki.
   */
  async removeRating(rating: Rating): Promise<Rating> {
    return rating.remove();
  }
}
