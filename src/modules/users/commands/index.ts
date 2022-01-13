import { CreateUserHandler } from '@/modules/users/commands/create-user';
import { RemoveUserHandler } from '@/modules/users/commands/remove-user';
import { UpdateUserHandler } from '@/modules/users/commands/update-user';
import { ChangeRoleHandler } from '@/modules/users/commands/change-role';
import { ChangePasswordHandler } from '@/modules/users/commands/change-password';

export * from '@/modules/users/commands/create-user';
export * from '@/modules/users/commands/remove-user';
export * from '@/modules/users/commands/update-user';
export * from '@/modules/users/commands/change-role';
export * from '@/modules/users/commands/change-password'

export const CommandHandlers = [CreateUserHandler, RemoveUserHandler, UpdateUserHandler, ChangeRoleHandler, ChangePasswordHandler];
