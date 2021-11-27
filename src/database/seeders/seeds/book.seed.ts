import { Book, BookType } from '@/modules/books/entities/book.entity';

export const BookSeed: Book[] = Array.from({ length: 5 }, (_, i) => {
  const id = i + 1;

  return {
    id,
    isbn: `${id}`.repeat(13),
    title: `Sample title ${id}`,
    issueDate: new Date(2021, id),
    publisher: {
      id: 1,
      name: `Name 1`,
      createdAt: new Date(),
    },
    authors: [
      {
        id: 1,
        firstName: `First name 1`,
        lastName: `Last name 1`,
        createdAt: new Date(),
      },
      {
        id: 2,
        firstName: `First name 2`,
        lastName: `Last Name 2`,
        createdAt: new Date(),
      },
    ],
    type: BookType.BOOK,
    genre: {
      id: 1,
      value: 'horror',
    },
    language: {
      id: 1,
      value: 'polski',
    },
    pagesCount: 100,
    tags: [
      {
        id: 1,
        value: 'Tag 1',
      },
      {
        id: 2,
        value: 'Tag 2',
      },
    ],
    details: {},
    createdAt: new Date(),
  };
});
