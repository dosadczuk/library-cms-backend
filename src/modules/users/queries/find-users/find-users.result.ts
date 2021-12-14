import { FindUsersResultDto } from '@/modules/users/dto/find-users.dto';

export class FindUsersResult {
  constructor(readonly users: FindUsersResultDto) {}
}
