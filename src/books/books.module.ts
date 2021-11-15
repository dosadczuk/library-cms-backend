import { BooksController } from '@/books/controller/books.controller';
import { BooksService } from '@/books/service/books.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [ BooksController ],
  providers: [ BooksService ],
})
export class BooksModule {}
