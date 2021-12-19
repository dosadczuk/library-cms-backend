import { RemoveBookCopyBorrowCommand } from '@/modules/books/commands/remove-book-copy-borrow/remove-book-copy-borrow.command';
import { Borrow, Copy } from '@/modules/books/entities';
import { BookCopyBorrowNotFoundError } from '@/modules/books/errors/book-copy-borrow-not-found.error';
import { BookCopyNotFoundError } from '@/modules/books/errors/book-copy-not-found.error';
import { BookRepository } from '@/modules/books/repositories';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(RemoveBookCopyBorrowCommand)
export class RemoveBookCopyBorrowHandler implements ICommandHandler<RemoveBookCopyBorrowCommand> {
  constructor(private readonly repository: BookRepository) {}

  async execute(command: RemoveBookCopyBorrowCommand): Promise<any> {
    const copy = await this.findBookCopy(command);
    if (copy == null || copy.bookId !== command.bookId) {
      throw new BookCopyNotFoundError(command.bookId, command.copyId);
    }

    const borrow = await this.findCopyBorrow(command);
    if (borrow == null) {
      throw new BookCopyBorrowNotFoundError(command.bookId, command.copyId, command.borrowId);
    }

    await this.repository.removeBorrow(borrow);
  }

  private async findBookCopy(command: RemoveBookCopyBorrowCommand): Promise<Copy | null> {
    return this.repository.findBookCopy(command.bookId, command.copyId);
  }

  private async findCopyBorrow(command: RemoveBookCopyBorrowCommand): Promise<Borrow | null> {
    return this.repository.findCopyBorrow(command.copyId, command.borrowId);
  }
}
