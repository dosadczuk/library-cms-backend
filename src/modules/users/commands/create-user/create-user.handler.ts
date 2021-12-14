import { CreateUserCommand } from '@/modules/users/commands/create-user/create-user.command';
import { CreateUserResult } from '@/modules/users/commands/create-user/create-user.result';
import { CreateUserResultDto } from '@/modules/users/dto';
import { User } from '@/modules/users/entities';
import { UserAlreadyExistsError } from '@/modules/users/errors';
import { UserRepository } from '@/modules/users/repositories';
import { UsersService } from '@/modules/users/users.service';
import { UserViewModel } from '@/modules/users/vms';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand, CreateUserResult> {
  constructor(
    private readonly repository: UserRepository,
    private readonly service: UsersService,
  ) {}

  async execute(command: CreateUserCommand): Promise<CreateUserResult> {
    if (await this.isUserExists(command)) {
      throw new UserAlreadyExistsError(command.user.email);
    }

    const user = await this.createUser(command);

    await this.repository.persist(user);

    const result = new CreateUserResultDto(new UserViewModel(user));

    return new CreateUserResult(result);
  }

  private async isUserExists(command: CreateUserCommand): Promise<boolean> {
    return this.repository.isUserExists(command.user.email);
  }

  private async createUser(command: CreateUserCommand): Promise<User> {
    const user = new User();
    user.firstName = command.user.firstName;
    user.lastName = command.user.lastName;
    user.email = command.user.email;
    user.password = command.user.password;
    user.role = command.user.role;

    return user;
  }
}
