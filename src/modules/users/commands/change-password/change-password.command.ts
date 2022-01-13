import { ChangePasswordBodyDto } from '@/modules/users/dto';

export class ChangePasswordCommand {
  constructor(readonly userId: number, readonly user: ChangePasswordBodyDto) {}
}
