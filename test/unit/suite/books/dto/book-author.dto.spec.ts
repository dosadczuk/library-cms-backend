import { BookAuthorDto } from '@/books/dto/book-author.dto';

describe('BookAuthorDto', () => {
  it('should be defined', () => {
    expect(new BookAuthorDto()).toBeDefined();
  });
});
