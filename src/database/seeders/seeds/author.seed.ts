import { Author } from '@/modules/books/entities/author.entity';
import { randomNumber } from '@/utils/random';

const samples: Partial<Author>[] = [
  {
    firstName: 'Antoni',
    lastName: 'Nowak',
  },
  {
    firstName: 'Antoni',
    lastName: 'Kowalski',
  },
  {
    firstName: 'Jan',
    lastName: 'Wiśniewski',
  },
  {
    firstName: 'Jan',
    lastName: 'Kamiński',
  },
  {
    firstName: 'Aleksander',
    lastName: 'Nowak',
  },
  {
    firstName: 'Aleksander',
    lastName: 'Kamiński',
  },
  {
    firstName: 'Jakub',
    lastName: 'Kowalski',
  },
  {
    firstName: 'Jakub',
    lastName: 'Wiśniewski',
  },
];

export const AuthorSeed: Author[] = samples.map((it, idx) => {
  const author = new Author();
  author.id = idx + 1;
  author.firstName = it.firstName;
  author.lastName = it.lastName;

  return author;
});

export const randomAuthor = (): Author => {
  const idx = randomNumber(samples.length - 1, 0);
  const data = samples[idx];

  const author = new Author();
  author.id = idx + 1;
  author.firstName = data.firstName;
  author.lastName = data.lastName;

  return author;
};

export const randomAuthors = (): Author[] => {
  const count = randomNumber(3, 1);

  const authors: Author[] = [];

  for (let idx = 0; idx < count; idx++) {
    let author = randomAuthor();
    while (authors.find((it) => it.id === author.id)) {
      author = randomAuthor();
    }

    authors.push(author);
  }

  return authors;
};
