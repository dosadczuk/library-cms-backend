import { CreateBook } from '@/modules/books/dto/create-book.dto';
import { UpdateBook } from '@/modules/books/dto/update-book.dto';
import { Author } from '@/modules/books/entities/author.entity';
import { Book } from '@/modules/books/entities/book.entity';
import { Genre } from '@/modules/books/entities/genre.entity';
import { Language } from '@/modules/books/entities/language.entity';
import { Publisher } from '@/modules/books/entities/publisher.entity';
import { Tag } from '@/modules/books/entities/tag.entity';
import { AuthorsFilter } from '@/modules/books/filters/authors.filter';
import { BooksFilter } from '@/modules/books/filters/books.filter';
import { GenresFilter } from '@/modules/books/filters/genres.filter';
import { LanguagesFilter } from '@/modules/books/filters/languages.filter';
import { PublishersFilter } from '@/modules/books/filters/publishers.filter';
import { TagsFilter } from '@/modules/books/filters/tags.filter';
import { AuthorsService } from '@/modules/books/services/authors.service';
import { BooksService } from '@/modules/books/services/books.service';
import { GenresService } from '@/modules/books/services/genres.service';
import { LanguagesService } from '@/modules/books/services/languages.service';
import { PublishersService } from '@/modules/books/services/publishers.service';
import { TagsService } from '@/modules/books/services/tags.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(
    private readonly authorsService: AuthorsService,
    private readonly booksService: BooksService,
    private readonly genresService: GenresService,
    private readonly languagesService: LanguagesService,
    private readonly publishersService: PublishersService,
    private readonly tagsService: TagsService,
  ) {}

  @Get('authors')
  findAuthors(@Query() filter: AuthorsFilter): Promise<Author[]> {
    return this.authorsService.findAll(filter);
  }

  @Get('genres')
  findGenres(@Query() filter: GenresFilter): Promise<Genre[]> {
    return this.genresService.findAll(filter);
  }

  @Get('languages')
  findLanguages(@Query() filter: LanguagesFilter): Promise<Language[]> {
    return this.languagesService.findAll(filter);
  }

  @Get('publishers')
  findPublishers(@Query() filter: PublishersFilter): Promise<Publisher[]> {
    return this.publishersService.findAll(filter);
  }

  @Get('tags')
  findTags(@Query() filter: TagsFilter): Promise<Tag[]> {
    return this.tagsService.findAll(filter);
  }

  @Get()
  findAll(@Query() filter: BooksFilter): Promise<Book[]> {
    return this.booksService.findAll(filter);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Book> {
    return this.booksService.findOne(+id);
  }

  @Post()
  create(@Body() data: CreateBook): Promise<Book> {
    return this.booksService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateBook) {
    return this.booksService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(+id);
  }
}
