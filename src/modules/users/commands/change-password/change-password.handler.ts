import { ChangePasswordCommand } from '@/modules/users/commands/change-password/change-password.command';
import { ChangePasswordResult } from '@/modules/users/commands/change-password/change-password.result';
import { ChangePasswordResultDto } from '@/modules/users/dto';
import { User } from '@/modules/users/entities';
import { UserNotFoundError } from '@/modules/users/errors';
import { UserRepository } from '@/modules/users/repositories';
import { UserViewModel } from '@/modules/users/vms';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(ChangePasswordCommand)
export class ChangePasswordHandler
  implements ICommandHandler<ChangePasswordCommand, ChangePasswordResult>
{
  constructor(private readonly repository: UserRepository) {}

  async execute(command: ChangePasswordCommand): Promise<ChangePasswordResult> {
    if (await this.isUserNotExists(command)) {
      throw new UserNotFoundError(command.userId);
    }

    const user = await this.createUser(command);

    await this.repository.persist(user);

    const result = new ChangePasswordResultDto(new UserViewModel(user));

    return new ChangePasswordResult(result);
  }

  private async isUserNotExists(command: ChangePasswordCommand): Promise<boolean> {
    return (await this.repository.findOne(command.userId)) == null;
  }

  private async createUser(command: ChangePasswordCommand): Promise<User> {
    const user = await this.repository.findOne(command.userId);
    user.password = command.user.password;

    return user;
  }
}
