import { getRandomAuthors } from '@/database/seeders/seeds/author.seed';
import { getRandomGenre } from '@/database/seeders/seeds/genre.seed';
import { getRandomLanguage } from '@/database/seeders/seeds/language.seed';
import { getRandomPublisher } from '@/database/seeders/seeds/publisher.seed';
import { getRandomTags } from '@/database/seeders/seeds/tag.seed';
import {
  Author,
  Genre,
  Language,
  Publisher,
  Tag,
} from '@/modules/books/entities';
import { Book } from '@/modules/books/entities/book.entity';
import { BookType } from '@/modules/books/enums/book-type.enum';
import { getRandomNumber } from '@/utils/random';

const getRandomIsbn = (): string => {
  return String(Math.floor(Math.random() * 10000000000000));
};

const getRandomTitle = (): string => {
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

  const idx = getRandomNumber(titles.length - 1);

  return titles[idx];
};

const getRandomIssueDate = (): Date => {
  return new Date(+new Date() - Math.floor(Math.random() * 1000000000000));
};

const getRandomType = (): BookType => {
  const types = Object.values(BookType);
  const typeIdx = getRandomNumber(types.length - 1);

  return types[typeIdx] as BookType;
};

const getRandomPages = (): number => {
  return getRandomNumber(1000, 50);
};

export const BookSeed: Book[] = Array.from({ length: 10 }, (_, i) => {
  return {
    id: i + 1,
    isbn: getRandomIsbn(),
    title: getRandomTitle(),
    issueDate: getRandomIssueDate(),
    publisher: getRandomPublisher() as Publisher,
    authors: getRandomAuthors() as Author[],
    type: getRandomType(),
    genre: getRandomGenre() as Genre,
    language: getRandomLanguage() as Language,
    pages: getRandomPages(),
    tags: getRandomTags() as Tag[],
    details: {},
    createdAt: new Date(),
  };
});
