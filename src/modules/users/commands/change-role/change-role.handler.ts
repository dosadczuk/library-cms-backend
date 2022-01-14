import { ChangeRoleCommand } from '@/modules/users/commands/change-role/change-role.command';
import { ChangeRoleResult } from '@/modules/users/commands/change-role/change-role.result';
import { ChangeRoleResultDto } from '@/modules/users/dto';
import { User } from '@/modules/users/entities';
import { UserNotFoundError } from '@/modules/users/errors';
import { UserRepository } from '@/modules/users/repositories';
import { UserViewModel } from '@/modules/users/vms';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(ChangeRoleCommand)
export class ChangeRoleHandler implements ICommandHandler<ChangeRoleCommand, ChangeRoleResult> {
  constructor(private readonly repository: UserRepository) {}

  async execute(command: ChangeRoleCommand): Promise<ChangeRoleResult> {
    if (await this.isUserNotExists(command)) {
      throw new UserNotFoundError(command.userId);
    }

    const user = await this.createUser(command);

    await this.repository.persist(user);

    const result = new ChangeRoleResultDto(new UserViewModel(user));

    return new ChangeRoleResult(result);
  }

  private async isUserNotExists(command: ChangeRoleCommand): Promise<boolean> {
    return (await this.repository.findOne(command.userId)) == null;
  }

  private async createUser(command: ChangeRoleCommand): Promise<User> {
    const user = await this.repository.findOne(command.userId);
    user.role = command.user.role;

    return user;
  }
}
