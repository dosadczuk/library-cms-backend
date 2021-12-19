import { RemoveBookCopyCommand } from '@/modules/books/commands/remove-book-copy/remove-book-copy.command';
import { Copy } from '@/modules/books/entities';
import { BookCopyNotFoundError } from '@/modules/books/errors/book-copy-not-found.error';
import { BookRepository } from '@/modules/books/repositories';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(RemoveBookCopyCommand)
export class RemoveBookCopyHandler implements ICommandHandler<RemoveBookCopyCommand> {
  constructor(private readonly repository: BookRepository) {}

  async execute(command: RemoveBookCopyCommand): Promise<void> {
    const copy = await this.findBookCopy(command);
    if (copy == null || copy.bookId != command.bookId) {
      throw new BookCopyNotFoundError(command.bookId, command.copyId);
    }

    await this.repository.removeCopy(copy);
  }

  private async findBookCopy(command: RemoveBookCopyCommand): Promise<Copy | null> {
    return this.repository.findBookCopy(command.bookId, command.copyId);
  }
}
