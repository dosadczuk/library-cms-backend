import { FindUserHandler } from '@/modules/users/queries/find-user';
import { FindUsersHandler } from '@/modules/users/queries/find-users';

export * from '@/modules/users/queries/find-user';
export * from '@/modules/users/queries/find-users';

export const QueryHandlers = [FindUserHandler, FindUsersHandler];
