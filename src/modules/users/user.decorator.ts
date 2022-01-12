import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User as UserEntity } from '@/modules/users/entities';

export const User = createParamDecorator((data: string, ctx: ExecutionContext): UserEntity => {
  const request = ctx.switchToHttp().getRequest();
  const user = request.user as UserEntity;

  return data ? user?.[data] : user;
});
