import { BookRatingEntity } from '@/books/entity/book-rating.entity';

describe('BookRatingEntity', () => {
  it('should be defined', () => {
    expect(new BookRatingEntity()).toBeDefined();
  });
});
