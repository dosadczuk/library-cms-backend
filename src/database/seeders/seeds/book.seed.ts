import { getRandomAuthor } from '@/database/seeders/seeds/author.seed';
import { getRandomGenre } from '@/database/seeders/seeds/genre.seed';
import { getRandomLanguage } from '@/database/seeders/seeds/language.seed';
import { getRandomPublisher } from '@/database/seeders/seeds/publisher.seed';
import { getRandomTag } from '@/database/seeders/seeds/tag.seed';
import { Author } from '@/modules/books/entities/author.entity';
import { Book, BookType } from '@/modules/books/entities/book.entity';
import { Tag } from '@/modules/books/entities/tag.entity';
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

const getRandomAuthors = (): Author[] => {
  const authorsCount = getRandomNumber(3, 1);

  const authors: Author[] = [];
  for (let i = 0; i < authorsCount; i++) {
    let author = getRandomAuthor();

    while (authors.find((it) => it.id === author.id)) {
      author = getRandomAuthor();
    }

    authors.push(author);
  }

  return authors;
};

const getRandomType = (): BookType => {
  const types = Object.values(BookType);
  const typeIdx = getRandomNumber(types.length - 1);

  return types[typeIdx] as BookType;
};

const getRandomPages = (): number => {
  return getRandomNumber(1000, 50);
};

const getRandomTags = (): Tag[] => {
  const tagsCount = getRandomNumber(5, 2);

  const tags: Tag[] = [];
  for (let i = 0; i < tagsCount; i++) {
    let tag = getRandomTag();

    while (tags.find((it) => it.id === tag.id)) {
      tag = getRandomTag();
    }

    tags.push(tag);
  }

  return tags;
};

export const BookSeed: Book[] = Array.from({ length: 10 }, (_, i) => {
  return {
    id: i + 1,
    isbn: getRandomIsbn(),
    title: getRandomTitle(),
    issueDate: getRandomIssueDate(),
    publisher: getRandomPublisher(),
    authors: getRandomAuthors(),
    type: getRandomType(),
    genre: getRandomGenre(),
    language: getRandomLanguage(),
    pages: getRandomPages(),
    tags: getRandomTags(),
    details: {},
    createdAt: new Date(),
  };
});
