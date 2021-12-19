import { CreateBookCopyBorrowHandler } from '@/modules/books/commands/create-book-copy-borrow/create-book-copy-borrow.handler';
import { CreateBookCopyHandler } from '@/modules/books/commands/create-book-copy/create-book-copy.handler';
import { CreateBookHandler } from '@/modules/books/commands/create-book/create-book.handler';
import { RemoveBookCopyBorrowHandler } from '@/modules/books/commands/remove-book-copy-borrow/remove-book-copy-borrow.handler';
import { RemoveBookCopyHandler } from '@/modules/books/commands/remove-book-copy/remove-book-copy.handler';
import { RemoveBookHandler } from '@/modules/books/commands/remove-book/remove-book.handler';
import { UpdateBookHandler } from '@/modules/books/commands/update-book/update-book.handler';

export * from '@/modules/books/commands/create-book';
export * from '@/modules/books/commands/create-book-copy-borrow';
export * from '@/modules/books/commands/create-book-copy';
export * from '@/modules/books/commands/remove-book';
export * from '@/modules/books/commands/remove-book-copy-borrow';
export * from '@/modules/books/commands/remove-book-copy';
export * from '@/modules/books/commands/update-book';

export const CommandHandlers = [
  CreateBookHandler,
  CreateBookCopyBorrowHandler,
  CreateBookCopyHandler,
  RemoveBookHandler,
  RemoveBookCopyBorrowHandler,
  RemoveBookCopyHandler,
  UpdateBookHandler,
];
