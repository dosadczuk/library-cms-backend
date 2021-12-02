import { BookController } from '@/modules/books/controllers/book.controller';
import { BooksController } from '@/modules/books/controllers/books.controller';
import { Author } from '@/modules/books/entities/author.entity';
import { Book } from '@/modules/books/entities/book.entity';
import { Copy } from '@/modules/books/entities/copy.entity';
import { Genre } from '@/modules/books/entities/genre.entity';
import { Language } from '@/modules/books/entities/language.entity';
import { Publisher } from '@/modules/books/entities/publisher.entity';
import { Rating } from '@/modules/books/entities/rating.entity';
import { Tag } from '@/modules/books/entities/tag.entity';
import { AuthorsService } from '@/modules/books/services/authors.service';
import { BooksService } from '@/modules/books/services/books.service';
import { CopiesService } from '@/modules/books/services/copies.service';
import { GenresService } from '@/modules/books/services/genres.service';
import { LanguagesService } from '@/modules/books/services/languages.service';
import { PublishersService } from '@/modules/books/services/publishers.service';
import { TagsService } from '@/modules/books/services/tags.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Author,
      Book,
      Copy,
      Genre,
      Language,
      Publisher,
      Rating,
      Tag,
    ]),
  ],
  controllers: [BookController, BooksController],
  providers: [
    AuthorsService,
    BooksService,
    CopiesService,
    GenresService,
    LanguagesService,
    PublishersService,
    TagsService,
  ],
})
export class BooksModule {}
