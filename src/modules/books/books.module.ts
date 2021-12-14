import { BooksController } from '@/modules/books/books.controller';
import { CommandHandlers } from '@/modules/books/commands';
import { QueryHandlers } from '@/modules/books/queries';
import { Repositories } from '@/modules/books/repositories';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule],
  controllers: [BooksController],
  providers: [...CommandHandlers, ...QueryHandlers, ...Repositories],
})
export class BooksModule {}
