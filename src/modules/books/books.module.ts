import { BooksController } from '@/modules/books/controllers/books.controller';
import { PublishersController } from '@/modules/books/controllers/publishers.controller';
import { Author } from '@/modules/books/entities/author.entity';
import { Book } from '@/modules/books/entities/book.entity';
import { Borrow } from '@/modules/books/entities/borrow.entity';
import { Copy } from '@/modules/books/entities/copy.entity';
import { Genre } from '@/modules/books/entities/genre.entity';
import { Language } from '@/modules/books/entities/language.entity';
import { Publisher } from '@/modules/books/entities/publisher.entity';
import { Rating } from '@/modules/books/entities/rating.entity';
import { Tag } from '@/modules/books/entities/tag.entity';
import { BooksService } from '@/modules/books/services/books.service';
import { PublishersService } from '@/modules/books/services/publishers.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Author,
      Book,
      Borrow,
      Copy,
      Genre,
      Language,
      Publisher,
      Rating,
      Tag,
    ]),
  ],
  controllers: [BooksController, PublishersController],
  providers: [BooksService, PublishersService],
})
export class BooksModule {}
