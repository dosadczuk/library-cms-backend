import { CommandHandlers } from '@/modules/books/commands';
import { QueryHandlers } from '@/modules/books/queries';
import { Repositories } from '@/modules/books/repositories';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { BooksController } from './books.controller';

@Module({
  imports: [CqrsModule],
  controllers: [BooksController],
  providers: [...CommandHandlers, ...QueryHandlers, ...Repositories],
})
export class BooksModule {}
