import { ChangeRoleBodyDto } from '@/modules/users/dto';

export class ChangeRoleCommand {
  constructor(readonly userId: number, readonly user: ChangeRoleBodyDto) {}
}
