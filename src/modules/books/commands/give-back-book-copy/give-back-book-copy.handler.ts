import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { GiveBackBookCopyCommand } from '@/modules/books/commands/give-back-book-copy/give-back-book-copy.command';
import { GiveBackBookCopyResult } from '@/modules/books/commands/give-back-book-copy/give-back-book-copy.result';
import { BookRepository } from '@/modules/books/repositories';
import { BookCopyBorrowNotFoundError, BookCopyNotFoundError } from '@/modules/books/errors';
import { Borrow, Copy } from '@/modules/books/entities';
import { GiveBackBookCopyResultDto } from '@/modules/books/dto';
import { BorrowWithUserViewModel } from '@/modules/books/vms';

@CommandHandler(GiveBackBookCopyCommand)
export class GiveBackBookCopyHandler
  implements ICommandHandler<GiveBackBookCopyCommand, GiveBackBookCopyResult>
{
  constructor(private readonly repository: BookRepository) {}

  async execute(command: GiveBackBookCopyCommand): Promise<GiveBackBookCopyResult> {
    const copy = await this.findBookCopy(command);
    if (copy == null || copy.bookId !== command.bookId) {
      throw new BookCopyNotFoundError(command.bookId, command.copyId);
    }

    const borrow = await this.findCopyBorrow(command);
    if (borrow == null) {
      throw new BookCopyBorrowNotFoundError(command.bookId, command.copyId, command.borrowId);
    }

    this.giveBackBorrow(borrow);

    await this.repository.persistBorrow(borrow);

    const result = new GiveBackBookCopyResultDto(new BorrowWithUserViewModel(borrow));

    return new GiveBackBookCopyResult(result);
  }

  private async findBookCopy(command: GiveBackBookCopyCommand): Promise<Copy> {
    return this.repository.findBookCopy(command.bookId, command.copyId);
  }

  private async findCopyBorrow(command: GiveBackBookCopyCommand): Promise<Borrow> {
    return this.repository.findCopyBorrow(command.copyId, command.borrowId);
  }

  private giveBackBorrow(borrow: Borrow): void {
    borrow.dateTo = new Date();
  }
}
