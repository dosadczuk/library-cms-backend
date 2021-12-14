import { CreateUserBodyDto } from '@/modules/users/dto';

export class CreateUserCommand {
  constructor(readonly user: CreateUserBodyDto) {}
}
