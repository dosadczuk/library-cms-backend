import { LoginCommand } from '@/modules/auth/commands/login/login.command';
import { LoginResult } from '@/modules/auth/commands/login/login.result';
import { LoginResultDto } from '@/modules/auth/dto';
import { JwtPayload } from '@/modules/auth/types';
import { User } from '@/modules/users/entities/user.entity';
import { UsersService } from '@/modules/users/users.service';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';

@CommandHandler(LoginCommand)
export class LoginHandler implements ICommandHandler<LoginCommand, LoginResult> {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async execute(command: LoginCommand): Promise<LoginResult> {
    const user = await this.tryLoggingIn(command);

    const accessToken = this.createAccessToken(user);

    const result = new LoginResultDto(accessToken);

    return new LoginResult(result);
  }

  private createAccessToken(user: User): string {
    const payload: JwtPayload = {
      username: user.email,
      sub: user.id,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    return this.jwtService.sign(payload);
  }

  private async tryLoggingIn(command: LoginCommand): Promise<User> {
    const user = await this.usersService.checkCredentials(
      command.credentials.email,
      command.credentials.password,
    );

    await this.usersService.rememberLastLoggingIn(user);

    return user;
  }
}
