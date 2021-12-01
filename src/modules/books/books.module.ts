import { AuthorsController } from '@/modules/books/controllers/authors.controller';
import { BooksController } from '@/modules/books/controllers/books.controller';
import { GenresController } from '@/modules/books/controllers/genres.controller';
import { LanguagesController } from '@/modules/books/controllers/languages.controller';
import { PublishersController } from '@/modules/books/controllers/publishers.controller';
import { TagsController } from '@/modules/books/controllers/tags.controller';
import { Borrow } from '@/modules/books/entities/borrow.entity';
import { Copy } from '@/modules/books/entities/copy.entity';
import { Rating } from '@/modules/books/entities/rating.entity';
import { AuthorRepository } from '@/modules/books/repositories/author.repository';
import { BookRepository } from '@/modules/books/repositories/book.repository';
import { GenreRepository } from '@/modules/books/repositories/genre.repository';
import { LanguageRepository } from '@/modules/books/repositories/language.repository';
import { PublisherRepository } from '@/modules/books/repositories/publisher.repository';
import { TagRepository } from '@/modules/books/repositories/tag.repository';
import { AuthorsService } from '@/modules/books/services/authors.service';
import { BooksService } from '@/modules/books/services/books.service';
import { GenresService } from '@/modules/books/services/genres.service';
import { LanguagesService } from '@/modules/books/services/languages.service';
import { PublishersService } from '@/modules/books/services/publishers.service';
import { TagsService } from '@/modules/books/services/tags.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AuthorRepository,
      BookRepository,
      Borrow,
      Copy,
      GenreRepository,
      LanguageRepository,
      PublisherRepository,
      Rating,
      TagRepository,
    ]),
  ],
  controllers: [
    AuthorsController,
    BooksController,
    GenresController,
    LanguagesController,
    PublishersController,
    TagsController,
  ],
  providers: [
    AuthorsService,
    BooksService,
    GenresService,
    LanguagesService,
    PublishersService,
    TagsService,
  ],
})
export class BooksModule {}
