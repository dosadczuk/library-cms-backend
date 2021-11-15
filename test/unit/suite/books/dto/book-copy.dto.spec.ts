import { BookCopyDto } from '@/books/dto/book-copy.dto';

describe('BookCopyDto', () => {
  it('should be defined', () => {
    expect(new BookCopyDto()).toBeDefined();
  });
});
