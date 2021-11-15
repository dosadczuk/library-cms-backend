import { BookBorrowEntity } from '@/books/entity/book-borrow.entity';

describe('BookBorrowEntity', () => {
  it('should be defined', () => {
    expect(new BookBorrowEntity()).toBeDefined();
  });
});
