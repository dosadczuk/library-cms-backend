import { CreateBookCopyBorrowCommand } from '@/modules/books/commands/create-book-copy-borrow/create-book-copy-borrow.command';
import { CreateBookCopyBorrowResult } from '@/modules/books/commands/create-book-copy-borrow/create-book-copy-borrow.result';
import { CreateBookCopyBorrowResultDto } from '@/modules/books/dto';
import { Borrow, Copy } from '@/modules/books/entities';
import { BookCopyNotFoundError } from '@/modules/books/errors';
import { BookRepository } from '@/modules/books/repositories';
import { BorrowViewModel } from '@/modules/books/vms';
import { User } from '@/modules/users/entities';
import { UserNotFoundError } from '@/modules/users/errors';
import { UserRepository } from '@/modules/users/repositories';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(CreateBookCopyBorrowCommand)
export class CreateBookCopyBorrowHandler
  implements ICommandHandler<CreateBookCopyBorrowCommand, CreateBookCopyBorrowResult>
{
  constructor(
    private readonly bookRepository: BookRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(command: CreateBookCopyBorrowCommand): Promise<CreateBookCopyBorrowResult> {
    const copy = await this.findBookCopy(command);
    if (copy == null || copy.bookId !== command.bookId) {
      throw new BookCopyNotFoundError(command.bookId, command.copyId);
    }

    const user = await this.findUser(command);
    if (user == null) {
      throw new UserNotFoundError(command.userId);
    }

    const borrow = await this.createCopyBorrow(copy, user, command);

    await this.bookRepository.persistBorrow(borrow);

    const result = new CreateBookCopyBorrowResultDto(new BorrowViewModel(borrow));

    return new CreateBookCopyBorrowResult(result);
  }

  private async findBookCopy(command: CreateBookCopyBorrowCommand): Promise<Copy | null> {
    return this.bookRepository.findBookCopy(command.bookId, command.copyId);
  }

  private async findUser(command: CreateBookCopyBorrowCommand): Promise<User | null> {
    return this.userRepository.findOne(command.borrow.userId);
  }

  private async createCopyBorrow(
    copy: Copy,
    user: User,
    command: CreateBookCopyBorrowCommand,
  ): Promise<Borrow> {
    const borrow = new Borrow();
    borrow.dateFrom = command.borrow.dateFrom;
    borrow.copy = copy;
    borrow.user = user;

    return borrow;
  }
}
