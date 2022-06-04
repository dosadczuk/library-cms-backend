import { getRandomBook } from '@/database/seeders/seeds/book.seed';
import { getRandomUser } from '@/database/seeders/seeds/user.seed';
import { Rating } from '@/modules/books/entities';
import { randomNumber } from '@/utils/random';
import { faker } from '@faker-js/faker';

export const RatingSeed: Rating[] = Array.from({ length: 7500 }, (_, i) => {
  const rating = new Rating();
  rating.id = i + 1;
  rating.bookId = getRandomBook().id;
  rating.userId = getRandomUser().id;
  rating.value = randomNumber(5, 1).toString();
  if (i % 3 === 0) {
    rating.comment = faker.commerce.productDescription();
  }

  return rating;
});
