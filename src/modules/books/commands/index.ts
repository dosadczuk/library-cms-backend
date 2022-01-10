import { CreateBookCopyBorrowHandler } from '@/modules/books/commands/create-book-copy-borrow/create-book-copy-borrow.handler';
import { CreateBookCopyHandler } from '@/modules/books/commands/create-book-copy/create-book-copy.handler';
import { CreateBookRatingHandler } from '@/modules/books/commands/create-book-rating/create-book-rating.handler';
import { CreateBookHandler } from '@/modules/books/commands/create-book/create-book.handler';
import { RemoveBookCopyBorrowHandler } from '@/modules/books/commands/remove-book-copy-borrow/remove-book-copy-borrow.handler';
import { RemoveBookCopyHandler } from '@/modules/books/commands/remove-book-copy/remove-book-copy.handler';
import { RemoveBookRatingHandler } from '@/modules/books/commands/remove-book-rating/remove-book-rating.handler';
import { RemoveBookHandler } from '@/modules/books/commands/remove-book/remove-book.handler';
import { UpdateBookHandler } from '@/modules/books/commands/update-book/update-book.handler';
import { GiveBackBookCopyHandler } from '@/modules/books/commands/give-back-book-copy/give-back-book-copy.handler';

export * from '@/modules/books/commands/create-book';
export * from '@/modules/books/commands/create-book-copy';
export * from '@/modules/books/commands/create-book-copy-borrow';
export * from '@/modules/books/commands/create-book-rating';
export * from '@/modules/books/commands/give-back-book-copy';
export * from '@/modules/books/commands/remove-book';
export * from '@/modules/books/commands/remove-book-copy';
export * from '@/modules/books/commands/remove-book-copy-borrow';
export * from '@/modules/books/commands/remove-book-rating';
export * from '@/modules/books/commands/update-book';

export const CommandHandlers = [
  CreateBookHandler,
  CreateBookCopyHandler,
  CreateBookCopyBorrowHandler,
  CreateBookRatingHandler,
  GiveBackBookCopyHandler,
  RemoveBookHandler,
  RemoveBookCopyHandler,
  RemoveBookCopyBorrowHandler,
  RemoveBookRatingHandler,
  UpdateBookHandler,
];
