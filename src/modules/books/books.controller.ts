import { CreateBookCopyCommand } from '@/modules/books/commands/create-book-copy/create-book-copy.command';
import { CreateBookCopyResult } from '@/modules/books/commands/create-book-copy/create-book-copy.result';
import { CreateBookCommand } from '@/modules/books/commands/create-book/create-book.command';
import { CreateBookResult } from '@/modules/books/commands/create-book/create-book.result';
import { RemoveBookCopyCommand } from '@/modules/books/commands/remove-book-copy/remove-book-copy.command';
import { RemoveBookCommand } from '@/modules/books/commands/remove-book/remove-book.command';
import { UpdateBookCommand } from '@/modules/books/commands/update-book/update-book.command';
import { UpdateBookResult } from '@/modules/books/commands/update-book/update-book.result';
import {
  CreateBookCopyDto,
  CreateBookCopyResultDto,
  CreateUpdateBookDto,
  CreateUpdateBookResultDto,
  FindAuthorsFilterDto,
  FindAuthorsResultDto,
  FindBookCopiesResultDto,
  FindBookResultDto,
  FindBooksFilterDto,
  FindBooksResultDto,
  FindGenresFilterDto,
  FindGenresResultDto,
  FindLanguagesFilterDto,
  FindLanguagesResultDto,
  FindPublishersFilterDto,
  FindPublishersResultDto,
  FindTagsFilterDto,
  FindTagsResultDto,
} from '@/modules/books/dto';
import { FindAuthorsQuery } from '@/modules/books/queries/find-authors/find-authors.query';
import { FindAuthorsResult } from '@/modules/books/queries/find-authors/find-authors.result';
import { FindBookCopiesQuery } from '@/modules/books/queries/find-book-copies/find-book-copies.query';
import { FindBookCopiesResult } from '@/modules/books/queries/find-book-copies/find-book-copies.result';
import { FindBookQuery } from '@/modules/books/queries/find-book/find-book.query';
import { FindBookResult } from '@/modules/books/queries/find-book/find-book.result';
import { FindBooksQuery } from '@/modules/books/queries/find-books/find-books.query';
import { FindBooksResult } from '@/modules/books/queries/find-books/find-books.result';
import { FindGenresQuery } from '@/modules/books/queries/find-genres/find-genres.query';
import { FindGenresResult } from '@/modules/books/queries/find-genres/find-genres.result';
import { FindLanguagesQuery } from '@/modules/books/queries/find-languages/find-languages.query';
import { FindLanguagesResult } from '@/modules/books/queries/find-languages/find-languages.result';
import { FindPublishersQuery } from '@/modules/books/queries/find-publishers/find-publishers.query';
import { FindPublishersResult } from '@/modules/books/queries/find-publishers/find-publishers.result';
import { FindTagsQuery } from '@/modules/books/queries/find-tags/find-tags.query';
import { FindTagsResult } from '@/modules/books/queries/find-tags/find-tags.result';
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
import { CommandBus, ICommand, IQuery, QueryBus } from '@nestjs/cqrs';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @ApiOperation({ summary: 'Pobieranie autorów książek' })
  @ApiOkResponse({ type: FindAuthorsResultDto })
  @Get('authors')
  async findAuthors(
    @Query() filter?: FindAuthorsFilterDto,
  ): Promise<FindAuthorsResultDto> {
    const query = new FindAuthorsQuery(filter);
    const result = await this.executeQuery<FindAuthorsResult>(query);

    return result.authors;
  }

  @ApiOperation({ summary: 'Pobieranie gatunków książek' })
  @ApiOkResponse({ type: FindGenresResultDto })
  @Get('genres')
  async findGenres(
    @Query() filter?: FindGenresFilterDto,
  ): Promise<FindGenresResultDto> {
    const query = new FindGenresQuery(filter);
    const result = await this.executeQuery<FindGenresResult>(query);

    return result.genres;
  }

  @ApiOperation({ summary: 'Pobieranie języków książek' })
  @ApiOkResponse({ type: FindLanguagesResultDto })
  @Get('languages')
  async findLanguages(
    @Query() filter?: FindLanguagesFilterDto,
  ): Promise<FindLanguagesResultDto> {
    const query = new FindLanguagesQuery(filter);
    const result = await this.executeQuery<FindLanguagesResult>(query);

    return result.languages;
  }

  @ApiOperation({ summary: 'Pobieranie wydawców książek' })
  @ApiOkResponse({ type: FindPublishersResultDto })
  @Get('publishers')
  async findPublishers(
    @Query() filter?: FindPublishersFilterDto,
  ): Promise<FindPublishersResultDto> {
    const query = new FindPublishersQuery(filter);
    const result = await this.executeQuery<FindPublishersResult>(query);

    return result.publishers;
  }

  @ApiOperation({ summary: 'Pobieranie tagów książek' })
  @ApiOkResponse({ type: FindTagsResultDto })
  @Get('tags')
  async findTags(
    @Query() filter?: FindTagsFilterDto,
  ): Promise<FindTagsResultDto> {
    const query = new FindTagsQuery(filter);
    const result = await this.executeQuery<FindTagsResult>(query);

    return result.tags;
  }

  @ApiOperation({ summary: 'Pobieranie książek' })
  @ApiOkResponse({ type: FindBooksResultDto })
  @Get()
  async findAll(
    @Query() filter?: FindBooksFilterDto,
  ): Promise<FindBooksResultDto> {
    const query = new FindBooksQuery(filter);
    const result = await this.executeQuery<FindBooksResult>(query);

    return result.books;
  }

  @ApiOperation({ summary: 'Pobieranie książki' })
  @ApiOkResponse({ type: FindBookResultDto })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<FindBookResultDto> {
    const query = new FindBookQuery(id);
    const result = await this.executeQuery<FindBookResult>(query);

    return result.book;
  }

  @ApiOperation({ summary: 'Tworzenie książki' })
  @ApiOkResponse({
    type: CreateUpdateBookResultDto,
    description: 'Książka została pomyślnie utworzona',
  })
  @Post()
  async create(
    @Body() book: CreateUpdateBookDto,
  ): Promise<CreateUpdateBookResultDto> {
    const command = new CreateBookCommand(book);
    const result = await this.executeCommand<CreateBookResult>(command);

    return result.book;
  }

  @ApiOperation({ summary: 'Modyfikacja książki' })
  @ApiOkResponse({
    type: CreateUpdateBookResultDto,
    description: 'Książka została pomyślnie zmodyfikowana',
  })
  @Put(':id')
  async update(
    @Param('id') bookId,
    @Body() book: CreateUpdateBookDto,
  ): Promise<CreateUpdateBookResultDto> {
    const command = new UpdateBookCommand(bookId, book);
    const result = await this.executeCommand<UpdateBookResult>(command);

    return result.book;
  }

  @ApiOperation({ summary: 'Usuwanie książki' })
  @ApiOkResponse({
    description: 'Książka została pomyślnie usunięta',
  })
  @Delete(':id')
  async remove(@Param('id') bookId): Promise<void> {
    const command = new RemoveBookCommand(bookId);

    await this.executeCommand<void>(command);
  }

  @ApiOperation({ summary: 'Pobieranie egzemplarzy książki' })
  @ApiOkResponse({ type: FindBookCopiesResultDto })
  @Get(':id/copies')
  async findBookCopies(
    @Param('id') bookId: string,
  ): Promise<FindBookCopiesResultDto> {
    const query = new FindBookCopiesQuery(bookId);
    const result = await this.executeQuery<FindBookCopiesResult>(query);

    return result.bookCopies;
  }

  @ApiOperation({ summary: 'Tworzenie egzemplarza książki' })
  @ApiOkResponse({
    type: CreateBookCopyResultDto,
    description: 'Egzemplarz książki został pomyślnie utworzony',
  })
  @Post(':id/copies')
  async createBookCopy(
    @Param('id') bookId: string,
    @Body() bookCopy: CreateBookCopyDto,
  ): Promise<CreateBookCopyResultDto> {
    const command = new CreateBookCopyCommand(bookId, bookCopy);
    const result = await this.executeCommand<CreateBookCopyResult>(command);

    return result.bookCopy;
  }

  @ApiOperation({ summary: 'Usuwanie egzemplarza książki' })
  @ApiOkResponse({
    description: 'Egzemplarz książki został pomyślnie usunięty',
  })
  @Delete(':id/copies/:copy_id')
  async removeBookCopy(
    @Param('id') bookId: string,
    @Param('copy_id') bookCopyId: string,
  ): Promise<void> {
    const command = new RemoveBookCopyCommand(bookId, bookCopyId);

    await this.executeCommand<void>(command);
  }

  private async executeCommand<R = any>(c: ICommand): Promise<R> {
    return this.commandBus.execute<ICommand, R>(c);
  }

  private async executeQuery<R = any>(q: IQuery): Promise<R> {
    return this.queryBus.execute<IQuery, R>(q);
  }
}
