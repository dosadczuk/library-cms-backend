import { ManageBookHandler } from '@/modules/books/commands/manage-book/manage-book.handler';
import { UpdateBookCommand } from '@/modules/books/commands/update-book/update-book.command';
import { UpdateBookResult } from '@/modules/books/commands/update-book/update-book.result';
import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(UpdateBookCommand)
export class UpdateBookHandler
  extends ManageBookHandler
  implements ICommandHandler<UpdateBookCommand, UpdateBookResult>
{
  async execute(command: UpdateBookCommand): Promise<UpdateBookResult> {
    throw new BadRequestException('Not ready yet');
  }
}
