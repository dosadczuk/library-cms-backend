import { RegisterCommand } from '@/modules/auth/commands/register/register.command';
import { CreateUserHandler } from '@/modules/users/commands/create-user/create-user.handler';
import { CommandHandler } from '@nestjs/cqrs';

@CommandHandler(RegisterCommand)
export class RegisterHandler extends CreateUserHandler {}
