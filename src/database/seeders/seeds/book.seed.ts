import { randomAuthors } from '@/database/seeders/seeds/author.seed';
import { randomGenre } from '@/database/seeders/seeds/genre.seed';
import { randomLanguage } from '@/database/seeders/seeds/language.seed';
import { randomPublisher } from '@/database/seeders/seeds/publisher.seed';
import { randomTags } from '@/database/seeders/seeds/tag.seed';
import { Book } from '@/modules/books/entities/book.entity';
import { BookType } from '@/modules/books/entities/enums/book-type.enum';
import { randomNumber } from '@/utils/random';

const titles = [
  'Niewiadoma Elvisa',
  'Bogactwo McDonalda',
  'Precjoza Kolumba',
  'Hasło Washingtona',
  'Szarada Newtona',
  'Tajemnica Disneya',
  'Enigma Dionizosa',
  'Fortuna Billa Gatesa',
  'Skarb Afrodyty',
  'Zagadka Neila Armstronga',
  'Kod Gutenberga',
  'Klejnot Forda',
  'Szyfr Einsteina',
];

const randomBookType = (): BookType => {
  const bookTypes = Object.values(BookType);
  const randomIdx = randomNumber(bookTypes.length - 1, 0);

  return bookTypes[randomIdx] as BookType;
};

export const BookSeed: Book[] = Array.from({ length: 10 }, (_, idx) => {
  const book = new Book();
  book.id = idx + 1;
  book.isbn = String(Math.floor(Math.random() * 10 ** 13));
  book.type = randomBookType();
  book.title = titles.pop();
  book.issueDate = new Date(+new Date() - Math.floor(Math.random() * 10 ** 12));
  book.publisher = randomPublisher();
  book.authors = randomAuthors();
  book.genre = randomGenre();
  book.language = randomLanguage();
  book.pages = randomNumber(1000, 50);
  book.details = {};
  book.tags = randomTags();

  return book;
});
