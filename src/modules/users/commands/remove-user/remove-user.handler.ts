import { RemoveUserCommand } from '@/modules/users/commands/remove-user/remove-user.command';
import { User } from '@/modules/users/entities';
import { UserNotFoundError } from '@/modules/users/errors';
import { UserRepository } from '@/modules/users/repositories';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(RemoveUserCommand)
export class RemoveUserHandler implements ICommandHandler<RemoveUserCommand> {
  constructor(private readonly repository: UserRepository) {}

  async execute(command: RemoveUserCommand): Promise<any> {
    const user = await this.findUser(command);
    if (user == null) {
      throw new UserNotFoundError(command.userId);
    }

    await this.repository.remove(user);
  }

  private async findUser(command: RemoveUserCommand): Promise<User | null> {
    return this.repository.findOne(command.userId);
  }
}
