import { FindUserBorrowsResultDto } from '@/modules/books/dto';
import { FindUserBorrowsQuery } from '@/modules/books/queries/find-user-borrows/find-user-borrows.query';
import { FindUserBorrowsResult } from '@/modules/books/queries/find-user-borrows/find-user-borrows.result';
import { BookRepository } from '@/modules/books/repositories';
import { BorrowWithBookViewModel } from '@/modules/books/vms';
import { User } from '@/modules/users/entities';
import { UserNotFoundError } from '@/modules/users/errors';
import { UserRepository } from '@/modules/users/repositories';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(FindUserBorrowsQuery)
export class FindUserBorrowsHandler
  implements IQueryHandler<FindUserBorrowsQuery, FindUserBorrowsResult>
{
  constructor(
    private readonly userRepository: UserRepository,
    private readonly bookRepository: BookRepository,
  ) {}

  async execute(query: FindUserBorrowsQuery): Promise<FindUserBorrowsResult> {
    const user = await this.findUser(query);
    if (user == null) {
      throw new UserNotFoundError(query.userId);
    }

    const borrows = await this.findUserBorrows(user);

    const result = new FindUserBorrowsResultDto(borrows);

    return new FindUserBorrowsResult(result);
  }

  private async findUser(query: FindUserBorrowsQuery): Promise<User> {
    return this.userRepository.findOne(query.userId);
  }

  private async findUserBorrows(user: User): Promise<BorrowWithBookViewModel[]> {
    const borrows = await this.bookRepository.findUserBorrows(user.id);

    return borrows.map((it) => new BorrowWithBookViewModel(it));
  }
}
