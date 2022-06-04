import { getRandomBook } from '@/database/seeders/seeds/book.seed';
import { Copy } from '@/modules/books/entities';
import { randomNumber } from '@/utils/random';
import { faker } from '@faker-js/faker';

export const CopySeed: Copy[] = Array.from({ length: 4000 }, (_, i) => {
  const copy = new Copy();
  copy.id = i + 1;
  copy.number = faker.unique(() => faker.random.alphaNumeric(11, { casing: 'upper' }), null, {
    maxRetries: 8000,
  });
  copy.bookId = getRandomBook().id;

  return copy;
});

export const getRandomCopy = (): Copy => {
  return CopySeed.at(randomNumber(CopySeed.length - 1, 0));
};
