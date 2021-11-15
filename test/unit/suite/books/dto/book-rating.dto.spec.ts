import { BookRatingDto } from '@/books/dto/book-rating.dto';

describe('BookRatingDto', () => {
  it('should be defined', () => {
    expect(new BookRatingDto()).toBeDefined();
  });
});
