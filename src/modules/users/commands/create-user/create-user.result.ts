import { CreateUserResultDto } from '@/modules/users/dto';

export class CreateUserResult {
  constructor(readonly user: CreateUserResultDto) {}
}
