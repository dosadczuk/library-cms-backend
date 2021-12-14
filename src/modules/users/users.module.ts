import { CommandHandlers } from '@/modules/users/commands';
import { QueryHandlers } from '@/modules/users/queries';
import { Repositories } from '@/modules/users/repositories';
import { UsersController } from '@/modules/users/users.controller';
import { UsersService } from '@/modules/users/users.service';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule],
  exports: [UsersService, ...CommandHandlers, ...QueryHandlers, ...Repositories],
  controllers: [UsersController],
  providers: [UsersService, ...CommandHandlers, ...QueryHandlers, ...Repositories],
})
export class UsersModule {}
