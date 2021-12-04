import { CreateBookCopyHandler } from '@/modules/books/commands/create-book-copy/create-book-copy.handler';
import { CreateBookHandler } from '@/modules/books/commands/create-book/create-book.handler';
import { RemoveBookCopyHandler } from '@/modules/books/commands/remove-book-copy/remove-book-copy.handler';
import { RemoveBookHandler } from '@/modules/books/commands/remove-book/remove-book.handler';
import { UpdateBookHandler } from '@/modules/books/commands/update-book/update-book.handler';

export const CommandHandlers = [
  CreateBookHandler,
  CreateBookCopyHandler,
  RemoveBookHandler,
  RemoveBookCopyHandler,
  UpdateBookHandler,
];
