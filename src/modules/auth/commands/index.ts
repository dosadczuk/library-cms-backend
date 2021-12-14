import { LoginHandler } from '@/modules/auth/commands/login';
import { RegisterHandler } from '@/modules/auth/commands/register';

export * from '@/modules/auth/commands/login';
export * from '@/modules/auth/commands/register';

export const CommandHandlers = [LoginHandler, RegisterHandler];
