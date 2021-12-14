import { FindUsersResultDto } from '@/modules/users/dto';
import { FindUsersQuery } from '@/modules/users/queries/find-users/find-users.query';
import { FindUsersResult } from '@/modules/users/queries/find-users/find-users.result';
import { UserRepository } from '@/modules/users/repositories';
import { UserViewModel } from '@/modules/users/vms';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(FindUsersQuery)
export class FindUsersHandler implements IQueryHandler<FindUsersQuery, FindUsersResult> {
  constructor(private readonly repository: UserRepository) {}

  async execute(query: FindUsersQuery): Promise<FindUsersResult> {
    const users = await this.findUsers(query);

    const result = new FindUsersResultDto(users);

    return new FindUsersResult(result);
  }

  private async findUsers(query: FindUsersQuery): Promise<UserViewModel[]> {
    const users = await this.repository.findAll();

    return users.map((it) => new UserViewModel(it));
  }
}
