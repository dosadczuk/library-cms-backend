import { UpdateUserCommand } from '@/modules/users/commands/update-user/update-user.command';
import { UpdateUserResult } from '@/modules/users/commands/update-user/update-user.result';
import { UpdateUserResultDto } from '@/modules/users/dto';
import { User } from '@/modules/users/entities';
import { UserNotFoundError } from '@/modules/users/errors';
import { UserRepository } from '@/modules/users/repositories';
import { UserViewModel } from '@/modules/users/vms';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand, UpdateUserResult> {
  constructor(private readonly repository: UserRepository) {}

  async execute(command: UpdateUserCommand): Promise<UpdateUserResult> {
    if (await this.isUserNotExists(command)) {
      throw new UserNotFoundError(command.user.id);
    }

    const user = await this.createUser(command);

    await this.repository.persist(user);

    const result = new UpdateUserResultDto(new UserViewModel(user));

    return new UpdateUserResult(result);
  }

  private async isUserNotExists(command: UpdateUserCommand): Promise<boolean> {
    return this.repository.findOne(command.user.id) == null;
  }

  private async createUser(command: UpdateUserCommand): Promise<User> {
    const user = await this.repository.findOne(command.user.id);
    user.firstName = command.user.firstName;
    user.lastName = command.user.lastName;
    // user.role = command.user.role;

    return user;
  }
}
