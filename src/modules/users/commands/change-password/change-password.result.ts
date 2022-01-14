import { ChangePasswordResultDto } from '@/modules/users/dto';

export class ChangePasswordResult {
  constructor(readonly user: ChangePasswordResultDto) {}
}
