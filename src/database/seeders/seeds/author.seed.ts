import { Author } from '@/modules/books/entities/author.entity';
import { getRandomNumber } from '@/utils/random';

type IAuthor = Partial<Author>;

const authors: IAuthor[] = [
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

export const AuthorSeed: IAuthor[] = authors.map((author, i) => {
  return {
    id: i + 1,
    firstName: author.firstName,
    lastName: author.lastName,
    createdAt: new Date(),
  };
});

export const getRandomAuthor = (): IAuthor => {
  const idx = getRandomNumber(authors.length - 1);

  return Object.assign({ id: idx + 1 }, authors[idx]);
};

export const getRandomAuthors = (): IAuthor[] => {
  const count = getRandomNumber(3, 1);

  const authors: IAuthor[] = [];
  for (let i = 0; i < count; i++) {
    let author = getRandomAuthor();

    while (authors.find((it) => it.id === author.id)) {
      author = getRandomAuthor();
    }

    authors.push(author);
  }

  return authors;
};
