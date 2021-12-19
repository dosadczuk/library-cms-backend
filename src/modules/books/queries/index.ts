import { FindAuthorsHandler } from '@/modules/books/queries/find-authors';
import { FindBookHandler } from '@/modules/books/queries/find-book';
import { FindBookCopiesHandler } from '@/modules/books/queries/find-book-copies';
import { FindBookCopyBorrowHandler } from '@/modules/books/queries/find-book-copy-borrow';
import { FindBookCopyBorrowsHandler } from '@/modules/books/queries/find-book-copy-borrows';
import { FindBooksHandler } from '@/modules/books/queries/find-books';
import { FindGenresHandler } from '@/modules/books/queries/find-genres';
import { FindLanguagesHandler } from '@/modules/books/queries/find-languages';
import { FindPublishersHandler } from '@/modules/books/queries/find-publishers';
import { FindTagsHandler } from '@/modules/books/queries/find-tags';

export * from '@/modules/books/queries/find-authors';
export * from '@/modules/books/queries/find-book';
export * from '@/modules/books/queries/find-book-copies';
export * from '@/modules/books/queries/find-book-copy-borrow';
export * from '@/modules/books/queries/find-book-copy-borrows';
export * from '@/modules/books/queries/find-books';
export * from '@/modules/books/queries/find-genres';
export * from '@/modules/books/queries/find-languages';
export * from '@/modules/books/queries/find-publishers';
export * from '@/modules/books/queries/find-tags';

export const QueryHandlers = [
  FindAuthorsHandler,
  FindBookHandler,
  FindBookCopiesHandler,
  FindBookCopyBorrowHandler,
  FindBookCopyBorrowsHandler,
  FindBooksHandler,
  FindGenresHandler,
  FindLanguagesHandler,
  FindPublishersHandler,
  FindTagsHandler,
];
