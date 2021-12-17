import { JwtAuthGuard } from '@/modules/auth/guards';
import {
  CreateBookCommand,
  CreateBookCopyCommand,
  CreateBookCopyResult,
  CreateBookResult,
  RemoveBookCommand,
  RemoveBookCopyCommand,
  UpdateBookCommand,
  UpdateBookResult,
} from '@/modules/books/commands';
import {
  CreateBookCopyBodyDto,
  CreateBookCopyParamsDto,
  CreateBookCopyResultDto,
  CreateUpdateBookBodyDto,
  CreateUpdateBookResultDto,
  FindAuthorsFilterDto,
  FindAuthorsResultDto,
  FindBookCopiesParamsDto,
  FindBookCopiesResultDto,
  FindBookParamsDto,
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
  RemoveBookCopyParamsDto,
  RemoveBookParamsDto,
  UpdateBookParamsDto,
} from '@/modules/books/dto';
import {
  FindAuthorsQuery,
  FindAuthorsResult,
  FindBookCopiesQuery,
  FindBookCopiesResult,
  FindBookQuery,
  FindBookResult,
  FindBooksQuery,
  FindBooksResult,
  FindGenresQuery,
  FindGenresResult,
  FindLanguagesQuery,
  FindLanguagesResult,
  FindPublishersQuery,
  FindPublishersResult,
  FindTagsQuery,
  FindTagsResult,
} from '@/modules/books/queries';
import { BaseController } from '@/shared/base.controller';
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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('books')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('books')
export class BooksController extends BaseController {
  @ApiOperation({ summary: 'Pobieranie autorów książek' })
  @ApiOkResponse({
    type: FindAuthorsResultDto,
    description: 'Znalezieni autorzy',
  })
  @Get('authors')
  async findAuthors(@Query() filter?: FindAuthorsFilterDto): Promise<FindAuthorsResultDto> {
    const query = new FindAuthorsQuery(filter);
    const result = await this.executeQuery<FindAuthorsResult>(query);

    return result.authors;
  }

  @ApiOperation({ summary: 'Pobieranie gatunków książek' })
  @ApiOkResponse({
    type: FindGenresResultDto,
    description: 'Znalezione gatunki',
  })
  @Get('genres')
  async findGenres(@Query() filter?: FindGenresFilterDto): Promise<FindGenresResultDto> {
    const query = new FindGenresQuery(filter);
    const result = await this.executeQuery<FindGenresResult>(query);

    return result.genres;
  }

  @ApiOperation({ summary: 'Pobieranie języków książek' })
  @ApiOkResponse({
    type: FindLanguagesResultDto,
    description: 'Znalezione języki',
  })
  @Get('languages')
  async findLanguages(@Query() filter?: FindLanguagesFilterDto): Promise<FindLanguagesResultDto> {
    const query = new FindLanguagesQuery(filter);
    const result = await this.executeQuery<FindLanguagesResult>(query);

    return result.languages;
  }

  @ApiOperation({ summary: 'Pobieranie wydawców książek' })
  @ApiOkResponse({
    type: FindPublishersResultDto,
    description: 'Znalezieni wydawcy',
  })
  @Get('publishers')
  async findPublishers(
    @Query() filter?: FindPublishersFilterDto,
  ): Promise<FindPublishersResultDto> {
    const query = new FindPublishersQuery(filter);
    const result = await this.executeQuery<FindPublishersResult>(query);

    return result.publishers;
  }

  @ApiOperation({ summary: 'Pobieranie tagów książek' })
  @ApiOkResponse({
    type: FindTagsResultDto,
    description: 'Znalezione tagi',
  })
  @Get('tags')
  async findTags(@Query() filter?: FindTagsFilterDto): Promise<FindTagsResultDto> {
    const query = new FindTagsQuery(filter);
    const result = await this.executeQuery<FindTagsResult>(query);

    return result.tags;
  }

  @ApiOperation({ summary: 'Pobieranie książek' })
  @ApiOkResponse({
    type: FindBooksResultDto,
    description: 'Znalezione książki',
  })
  @Get()
  async findAll(@Query() filter?: FindBooksFilterDto): Promise<FindBooksResultDto> {
    const query = new FindBooksQuery(filter);
    const result = await this.executeQuery<FindBooksResult>(query);

    return result.books;
  }

  @ApiOperation({ summary: 'Pobieranie książki' })
  @ApiOkResponse({
    type: FindBookResultDto,
    description: 'Znaleziona książka',
  })
  @ApiBadRequestResponse({ description: 'Książka nie istnieje' })
  @Get(':id')
  async findOne(@Param() params: FindBookParamsDto): Promise<FindBookResultDto> {
    const query = new FindBookQuery(params.id);
    const result = await this.executeQuery<FindBookResult>(query);

    return result.book;
  }

  @ApiOperation({ summary: 'Tworzenie książki' })
  @ApiOkResponse({
    type: CreateUpdateBookResultDto,
    description: 'Książka została pomyślnie utworzona',
  })
  @ApiBadRequestResponse({ description: 'Książka z podanym ISBN już istnieje' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() book: CreateUpdateBookBodyDto): Promise<CreateUpdateBookResultDto> {
    const command = new CreateBookCommand(book);
    const result = await this.executeCommand<CreateBookResult>(command);

    return result.book;
  }

  @ApiOperation({ summary: 'Modyfikacja książki' })
  @ApiOkResponse({
    type: CreateUpdateBookResultDto,
    description: 'Książka została pomyślnie zmodyfikowana',
  })
  @ApiBadRequestResponse({ description: 'Książka nie istnieje' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param() params: UpdateBookParamsDto,
    @Body() book: CreateUpdateBookBodyDto,
  ): Promise<CreateUpdateBookResultDto> {
    const command = new UpdateBookCommand(params.id, book);
    const result = await this.executeCommand<UpdateBookResult>(command);

    return result.book;
  }

  @ApiOperation({ summary: 'Usuwanie książki' })
  @ApiOkResponse({ description: 'Książka została pomyślnie usunięta' })
  @ApiBadRequestResponse({ description: 'Książka nie istnieje' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param() params: RemoveBookParamsDto): Promise<void> {
    const command = new RemoveBookCommand(params.id);

    await this.executeCommand<void>(command);
  }

  @ApiOperation({ summary: 'Pobieranie egzemplarzy książki' })
  @ApiOkResponse({
    type: FindBookCopiesResultDto,
    description: 'Znalezione egzemplarze książki',
  })
  @ApiBadRequestResponse({ description: 'Książka nie istnieje' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id/copies')
  async findBookCopies(@Param() params: FindBookCopiesParamsDto): Promise<FindBookCopiesResultDto> {
    const query = new FindBookCopiesQuery(params.id);
    const result = await this.executeQuery<FindBookCopiesResult>(query);

    return result.bookCopies;
  }

  @ApiOperation({ summary: 'Tworzenie egzemplarza książki' })
  @ApiOkResponse({
    type: CreateBookCopyResultDto,
    description: 'Egzemplarz książki został pomyślnie utworzony',
  })
  @ApiBadRequestResponse({ description: 'Książka nie istnieje' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post(':id/copies')
  async createBookCopy(
    @Param() params: CreateBookCopyParamsDto,
    @Body() copy: CreateBookCopyBodyDto,
  ): Promise<CreateBookCopyResultDto> {
    const command = new CreateBookCopyCommand(params.id, copy);
    const result = await this.executeCommand<CreateBookCopyResult>(command);

    return result.copy;
  }

  @ApiOperation({ summary: 'Usuwanie egzemplarza książki' })
  @ApiOkResponse({ description: 'Egzemplarz książki został pomyślnie usunięty' })
  @ApiBadRequestResponse({ description: 'Książka nie istnieje' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id/copies/:copy_id')
  async removeBookCopy(@Param() params: RemoveBookCopyParamsDto): Promise<void> {
    const command = new RemoveBookCopyCommand(params.id, params.copyId);

    await this.executeCommand<void>(command);
  }
}
