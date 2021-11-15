import { BookBorrowDto } from '@/books/dto/book-borrow.dto';

describe('BookBorrowDto', () => {
  it('should be defined', () => {
    expect(new BookBorrowDto()).toBeDefined();
  });
});
