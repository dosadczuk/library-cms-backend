import { LoginBodyDto } from '@/modules/auth/dto';

export class LoginCommand {
  constructor(readonly credentials: LoginBodyDto) {}
}
