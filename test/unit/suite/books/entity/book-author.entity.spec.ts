import { BookAuthorEntity } from '@/books/entity/book-author.entity';

describe('BookAuthorEntity', () => {
  it('should be defined', () => {
    expect(new BookAuthorEntity()).toBeDefined();
  });
});
