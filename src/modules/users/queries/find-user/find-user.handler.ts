import { FindUserResultDto } from '@/modules/users/dto';
import { UserNotFoundError } from '@/modules/users/errors';
import { FindUserQuery } from '@/modules/users/queries/find-user/find-user.query';
import { FindUserResult } from '@/modules/users/queries/find-user/find-user.result';
import { UserRepository } from '@/modules/users/repositories';
import { UserViewModel } from '@/modules/users/vms';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(FindUserQuery)
export class FindUserHandler implements IQueryHandler<FindUserQuery, FindUserResult> {
  constructor(private readonly repository: UserRepository) {}

  async execute(query: FindUserQuery): Promise<FindUserResult> {
    const user = await this.findUser(query);
    if (user == null) {
      throw new UserNotFoundError(query.userId);
    }

    const result = new FindUserResultDto(user);

    return new FindUserResult(result);
  }

  private async findUser(query: FindUserQuery): Promise<UserViewModel | null> {
    const user = await this.repository.findOne(query.userId);
    if (user == null) {
      return null;
    }

    return new UserViewModel(user);
  }
}
