import { BookDto } from '@/books/dto/book.dto';

describe('BookDto', () => {
  it('should be defined', () => {
    expect(new BookDto()).toBeDefined();
  });
});
