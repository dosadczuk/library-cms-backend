import { BooksController } from '@/modules/books/books.controller';
import { CommandHandlers } from '@/modules/books/commands';
import { QueryHandlers } from '@/modules/books/queries';
import { Repositories } from '@/modules/books/repositories';
import { UsersController } from '@/modules/books/users.controller';
import { UserRepository } from '@/modules/users/repositories';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { FileRepository } from '@/modules/files/repositories';

@Module({
  imports: [CqrsModule],
  controllers: [BooksController, UsersController],
  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
    ...Repositories,
    UserRepository,
    FileRepository,
  ],
})
export class BooksModule {}
