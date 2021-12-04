import { FindAuthorsHandler } from '@/modules/books/queries/find-authors/find-authors.handler';
import { FindBookCopiesHandler } from '@/modules/books/queries/find-book-copies/find-book-copies.handler';
import { FindBookHandler } from '@/modules/books/queries/find-book/find-book.handler';
import { FindBooksHandler } from '@/modules/books/queries/find-books/find-books.handler';
import { FindGenresHandler } from '@/modules/books/queries/find-genres/find-genres.handler';
import { FindLanguagesHandler } from '@/modules/books/queries/find-languages/find-languages.handler';
import { FindPublishersHandler } from '@/modules/books/queries/find-publishers/find-publishers.handler';
import { FindTagsHandler } from '@/modules/books/queries/find-tags/find-tags.handler';

export const QueryHandlers = [
  FindAuthorsHandler,
  FindBookHandler,
  FindBookCopiesHandler,
  FindBooksHandler,
  FindGenresHandler,
  FindLanguagesHandler,
  FindPublishersHandler,
  FindTagsHandler,
];
