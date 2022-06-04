import { getRandomAuthors } from '@/database/seeders/seeds/author.seed';
import { getRandomGenre } from '@/database/seeders/seeds/genre.seed';
import { getRandomLanguage } from '@/database/seeders/seeds/language.seed';
import { getRandomPublisher } from '@/database/seeders/seeds/publisher.seed';
import { getRandomTags } from '@/database/seeders/seeds/tag.seed';
import { Book } from '@/modules/books/entities';
import { BookType } from '@/modules/books/entities/enums';
import { randomNumber } from '@/utils/random';
import { faker } from '@faker-js/faker';

export const BookSeed: Book[] = Array.from({ length: 1000 }, (_, i) => {
  const book = new Book();
  book.id = i + 1;
  book.isbn = faker.random.numeric(13, { allowLeadingZeros: true });
  book.type = randomBookType();
  book.title = faker.unique(faker.commerce.productName, null, { maxRetries: 2000 });
  book.description = faker.commerce.productDescription();
  book.issueDate = faker.date.past(40);
  book.publisher = getRandomPublisher();
  book.authors = getRandomAuthors();
  book.genre = getRandomGenre();
  book.language = getRandomLanguage();
  book.pages = randomNumber(1000, 50);
  book.details = {};
  book.tags = getRandomTags();

  return book;
});

export const getRandomBook = (): Book => {
  return BookSeed.at(randomNumber(BookSeed.length - 1, 0));
};

function randomBookType(): BookType {
  const bookTypes = Object.values(BookType);
  const randomIdx = randomNumber(bookTypes.length - 1, 0);

  return bookTypes[randomIdx] as BookType;
}
