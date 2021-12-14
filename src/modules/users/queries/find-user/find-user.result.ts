import { FindUserResultDto } from '@/modules/users/dto';

export class FindUserResult {
  constructor(readonly user: FindUserResultDto) {}
}
