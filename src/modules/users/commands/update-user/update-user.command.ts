import { UpdateUserBodyDto } from '@/modules/users/dto';

export class UpdateUserCommand {
  constructor(readonly userId: number, readonly user: UpdateUserBodyDto) {}
}
