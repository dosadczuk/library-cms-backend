import { InvalidCredentialsError } from '@/modules/auth/errors';
import { User } from '@/modules/users/entities';
import { UserRepository } from '@/modules/users/repositories';
import { Injectable } from '@nestjs/common';
import { compareSync } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private readonly repository: UserRepository) {}

  async checkCredentials(email: string, password: string): Promise<User> {
    const user = await this.repository.findOneByEmail(email);
    if (user == null) {
      throw new InvalidCredentialsError();
    }

    if (!compareSync(password, user.password)) {
      throw new InvalidCredentialsError();
    }

    return user;
  }

  async rememberLastLoggingIn(user: User): Promise<void> {
    user.lastLoggedAt = new Date();

    await this.repository.persist(user);
  }
}
