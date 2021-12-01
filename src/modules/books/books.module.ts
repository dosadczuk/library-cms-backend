import { BookController } from '@/modules/books/controllers/book.controller';
import { BooksController } from '@/modules/books/controllers/books.controller';
import { Rating } from '@/modules/books/entities/rating.entity';
import { AuthorRepository } from '@/modules/books/repositories/author.repository';
import { BookRepository } from '@/modules/books/repositories/book.repository';
import { CopyRepository } from '@/modules/books/repositories/copy.repository';
import { GenreRepository } from '@/modules/books/repositories/genre.repository';
import { LanguageRepository } from '@/modules/books/repositories/language.repository';
import { PublisherRepository } from '@/modules/books/repositories/publisher.repository';
import { TagRepository } from '@/modules/books/repositories/tag.repository';
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
      AuthorRepository,
      BookRepository,
      CopyRepository,
      GenreRepository,
      LanguageRepository,
      PublisherRepository,
      Rating,
      TagRepository,
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
