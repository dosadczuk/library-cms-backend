import { Author } from '@/modules/books/entities/author.entity';
import { getRandomNumber } from '@/utils/random';

const authors: Omit<Author, 'id'>[] = [
  {
    firstName: 'Antoni',
    lastName: 'Nowak',
    createdAt: new Date(),
  },
  {
    firstName: 'Antoni',
    lastName: 'Kowalski',
    createdAt: new Date(),
  },
  {
    firstName: 'Jan',
    lastName: 'Wiśniewski',
    createdAt: new Date(),
  },
  {
    firstName: 'Jan',
    lastName: 'Kamiński',
    createdAt: new Date(),
  },
  {
    firstName: 'Aleksander',
    lastName: 'Nowak',
    createdAt: new Date(),
  },
  {
    firstName: 'Aleksander',
    lastName: 'Kamiński',
    createdAt: new Date(),
  },
  {
    firstName: 'Jakub',
    lastName: 'Kowalski',
    createdAt: new Date(),
  },
  {
    firstName: 'Jakub',
    lastName: 'Wiśniewski',
    createdAt: new Date(),
  },
];

export const getRandomAuthor = (): Author => {
  const idx = getRandomNumber(authors.length - 1);

  return Object.assign({ id: idx + 1 }, authors[idx]);
};

export const AuthorSeed: Author[] = authors.map((author, i) => {
  return {
    id: i + 1,
    firstName: author.firstName,
    lastName: author.lastName,
    createdAt: new Date(),
  };
});
