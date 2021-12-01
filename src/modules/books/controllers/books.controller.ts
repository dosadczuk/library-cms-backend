import { CreateBook } from '@/modules/books/dto/create-book.dto';
import { UpdateBook } from '@/modules/books/dto/update-book.dto';
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
  findAuthors(@Query() filter: AuthorsFilter) {
    return this.authorsService.findAll(filter);
  }

  @Get('genres')
  findGenres(@Query() filter: GenresFilter) {
    return this.genresService.findAll(filter);
  }

  @Get('languages')
  findLanguages(@Query() filter: LanguagesFilter) {
    return this.languagesService.findAll(filter);
  }

  @Get('publishers')
  findPublishers(@Query() filter: PublishersFilter) {
    return this.publishersService.findAll(filter);
  }

  @Get('tags')
  findTags(@Query() filter: TagsFilter) {
    return this.tagsService.findAll(filter);
  }

  @Get()
  findAll(@Query() filter: BooksFilter) {
    return this.booksService.findAll(filter);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(+id);
  }

  @Post()
  create(@Body() data: CreateBook) {
    return this.booksService.create(data);
  }

  @Put()
  update(@Body() data: UpdateBook) {
    return this.booksService.update(data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(+id);
  }
}
