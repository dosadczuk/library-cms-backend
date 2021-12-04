import { RemoveBookCopyCommand } from '@/modules/books/commands/remove-book-copy/remove-book-copy.command';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(RemoveBookCopyCommand)
export class RemoveBookCopyHandler
  implements ICommandHandler<RemoveBookCopyCommand>
{
  async execute(command: RemoveBookCopyCommand): Promise<any> {
    return Promise.resolve(undefined);
  }
}
