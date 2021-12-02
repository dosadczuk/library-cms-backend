import { CreateBook, UpdateBook } from '@/modules/books/dto';
import {
  Author,
  Book,
  Genre,
  Language,
  Publisher,
  Tag,
} from '@/modules/books/entities';
import {
  AuthorsFilter,
  BooksFilter,
  GenresFilter,
  LanguagesFilter,
  PublishersFilter,
  TagsFilter,
} from '@/modules/books/filters';
import { AuthorsService } from '@/modules/books/services/authors.service';
import { BooksService } from '@/modules/books/services/books.service';
import { GenresService } from '@/modules/books/services/genres.service';
import { LanguagesService } from '@/modules/books/services/languages.service';
import { PublishersService } from '@/modules/books/services/publishers.service';
import { TagsService } from '@/modules/books/services/tags.service';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('books')
@Controller('books')
@UseInterceptors(ClassSerializerInterceptor)
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
    return this.authorsService.findAllWith(filter);
  }

  @Get('genres')
  findGenres(@Query() filter: GenresFilter): Promise<Genre[]> {
    return this.genresService.findAllWith(filter);
  }

  @Get('languages')
  findLanguages(@Query() filter: LanguagesFilter): Promise<Language[]> {
    return this.languagesService.findAllWith(filter);
  }

  @Get('publishers')
  findPublishers(@Query() filter: PublishersFilter): Promise<Publisher[]> {
    return this.publishersService.findAllWith(filter);
  }

  @Get('tags')
  findTags(@Query() filter: TagsFilter): Promise<Tag[]> {
    return this.tagsService.findAllWith(filter);
  }

  @Get()
  findAll(@Query() filter: BooksFilter): Promise<Book[]> {
    return this.booksService.findAllWith(filter);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Book> {
    return this.booksService.findById(+id);
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
