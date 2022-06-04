import { getRandomCopy } from '@/database/seeders/seeds/copy.seed';
import { getRandomUser } from '@/database/seeders/seeds/user.seed';
import { Borrow } from '@/modules/books/entities';
import { faker } from '@faker-js/faker';

export const BorrowSeed: Borrow[] = Array.from({ length: 10000 }, (_, i) => {
  const borrow = new Borrow();
  borrow.id = i + 1;
  borrow.copyId = getRandomCopy().id;
  borrow.userId = getRandomUser().id;
  borrow.dateFrom = faker.date.past(10);

  return borrow;
});
