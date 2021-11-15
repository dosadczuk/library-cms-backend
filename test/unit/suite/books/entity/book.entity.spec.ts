import { BookEntity } from '@/books/entity/book.entity';

describe('BookEntity', () => {
  it('should be defined', () => {
    expect(new BookEntity()).toBeDefined();
  });
});
