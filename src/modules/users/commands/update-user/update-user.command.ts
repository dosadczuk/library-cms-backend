import { UpdateUserBodyDto } from '@/modules/users/dto';

export class UpdateUserCommand {
  constructor(readonly user: UpdateUserBodyDto) {}
}
