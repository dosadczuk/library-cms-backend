import { CreateUserHandler } from '@/modules/users/commands/create-user';
import { RemoveUserHandler } from '@/modules/users/commands/remove-user';
import { UpdateUserHandler } from '@/modules/users/commands/update-user';

export * from '@/modules/users/commands/create-user';
export * from '@/modules/users/commands/remove-user';
export * from '@/modules/users/commands/update-user';

export const CommandHandlers = [CreateUserHandler, RemoveUserHandler, UpdateUserHandler];
