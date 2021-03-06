import { JwtAuthGuard, RolesGuard } from '@/modules/auth/guards';
import {
  CreateBookCommand,
  CreateBookCopyBorrowCommand,
  CreateBookCopyBorrowResult,
  CreateBookCopyCommand,
  CreateBookCopyResult,
  CreateBookRatingCommand,
  CreateBookRatingResult,
  CreateBookResult,
  GiveBackBookCopyCommand,
  GiveBackBookCopyResult,
  RemoveBookCommand,
  RemoveBookCopyBorrowCommand,
  RemoveBookCopyCommand,
  RemoveBookRatingCommand,
  UpdateBookCommand,
  UpdateBookResult,
} from '@/modules/books/commands';
import {
  CreateBookBodyDto,
  CreateBookCopyBodyDto,
  CreateBookCopyBorrowBodyDto,
  CreateBookCopyBorrowParamsDto,
  CreateBookCopyBorrowResultDto,
  CreateBookCopyParamsDto,
  CreateBookCopyResultDto,
  CreateUpdateBookRatingBodyDto,
  CreateUpdateBookRatingParamsDto,
  CreateUpdateBookRatingResultDto,
  CreateUpdateBookResultDto,
  FindAuthorsFilterDto,
  FindAuthorsResultDto,
  FindBookCopiesParamsDto,
  FindBookCopiesResultDto,
  FindBookCopyBorrowParamsDto,
  FindBookCopyBorrowsParamsDto,
  FindBookParamsDto,
  FindBookRatingsParamsDto,
  FindBookRatingsResultDto,
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
  GiveBackBookCopyParamsDto,
  GiveBackBookCopyResultDto,
  RemoveBookCopyBorrowParamsDto,
  RemoveBookCopyParamsDto,
  RemoveBookParamsDto,
  RemoveBookRatingParamsDto,
  UpdateBookBodyDto,
  UpdateBookParamsDto,
} from '@/modules/books/dto';
import {
  FindAuthorsQuery,
  FindAuthorsResult,
  FindBookCopiesQuery,
  FindBookCopiesResult,
  FindBookCopyBorrowQuery,
  FindBookCopyBorrowResult,
  FindBookCopyBorrowsQuery,
  FindBookCopyBorrowsResult,
  FindBookQuery,
  FindBookRatingsQuery,
  FindBookRatingsResult,
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
import { Roles } from '@/modules/auth/roles.decorator';
import { Role } from '@/modules/users/entities/enums';

@ApiTags('books')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('books')
export class BooksController extends BaseController {
  @ApiOperation({
    summary: 'Pobieranie autorów książek',
    description: 'Metoda pozwala na pobranie autorów książek.',
  })
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

  @ApiOperation({
    summary: 'Pobieranie gatunków książek',
    description: 'Metoda pozwala na pobranie gatunków książek.',
  })
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

  @ApiOperation({
    summary: 'Pobieranie języków książek',
    description: 'Metoda pozwala na pobranie języków książek.',
  })
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

  @ApiOperation({
    summary: 'Pobieranie wydawców książek',
    description: 'Metoda pozwala na pobranie wydawców książek.',
  })
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

  @ApiOperation({
    summary: 'Pobieranie tagów książek',
    description: 'Metoda pozwala na pobranie tagów książek.',
  })
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

  @ApiOperation({
    summary: 'Pobieranie książek',
    description: 'Metoda pozwala na pobranie książek.',
  })
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

  @ApiOperation({
    summary: 'Pobieranie książki',
    description: 'Metoda pozwala na pobranie szczegółów książki.',
  })
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

  @ApiOperation({
    summary: 'Tworzenie książki',
    description: `Metoda pozwala na utworzenie książki. Wymagane role: ${Role.ADMIN}/${Role.EMPLOYEE}.`,
  })
  @ApiOkResponse({
    type: CreateUpdateBookResultDto,
    description: 'Książka została pomyślnie utworzona',
  })
  @ApiBadRequestResponse({ description: 'Książka z podanym ISBN już istnieje' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.EMPLOYEE)
  @Post()
  async create(@Body() book: CreateBookBodyDto): Promise<CreateUpdateBookResultDto> {
    const command = new CreateBookCommand(book);
    const result = await this.executeCommand<CreateBookResult>(command);

    return result.book;
  }

  @ApiOperation({
    summary: 'Modyfikowanie książki',
    description: `Metoda pozwala na zmodyfikowanie książki. Wymagane role: ${Role.ADMIN}/${Role.EMPLOYEE}.`,
  })
  @ApiOkResponse({
    type: CreateUpdateBookResultDto,
    description: 'Książka została pomyślnie zmodyfikowana',
  })
  @ApiBadRequestResponse({ description: 'Książka nie istnieje' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.EMPLOYEE)
  @Put(':id')
  async update(
    @Param() params: UpdateBookParamsDto,
    @Body() book: UpdateBookBodyDto,
  ): Promise<CreateUpdateBookResultDto> {
    const command = new UpdateBookCommand(params.id, book);
    const result = await this.executeCommand<UpdateBookResult>(command);

    return result.book;
  }

  @ApiOperation({
    summary: 'Usuwanie książki',
    description: `Metoda pozwala na usunięcia książki. Wymagane role: ${Role.ADMIN}/${Role.EMPLOYEE}.`,
  })
  @ApiOkResponse({ description: 'Książka została pomyślnie usunięta' })
  @ApiBadRequestResponse({ description: 'Książka nie istnieje' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.EMPLOYEE)
  @Delete(':id')
  async remove(@Param() params: RemoveBookParamsDto): Promise<void> {
    const command = new RemoveBookCommand(params.id);

    await this.executeCommand<void>(command);
  }

  @ApiOperation({
    summary: 'Pobieranie egzemplarzy książki',
    description: `Metoda pozwala na pobranie egzemplarzy książki. Wymagane role: ${Role.ADMIN}/${Role.EMPLOYEE}/${Role.CUSTOMER}.`,
  })
  @ApiOkResponse({
    type: FindBookCopiesResultDto,
    description: 'Znalezione egzemplarze książki',
  })
  @ApiBadRequestResponse({ description: 'Książka nie istnieje' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.EMPLOYEE, Role.CUSTOMER)
  @Get(':id/copies')
  async findBookCopies(@Param() params: FindBookCopiesParamsDto): Promise<FindBookCopiesResultDto> {
    const query = new FindBookCopiesQuery(params.id);
    const result = await this.executeQuery<FindBookCopiesResult>(query);

    return result.bookCopies;
  }

  @ApiOperation({
    summary: 'Tworzenie egzemplarza książki',
    description: `Metoda pozwala na utworzenie egzemplarza książki. Wymagane role: ${Role.ADMIN}/${Role.EMPLOYEE}.`,
  })
  @ApiOkResponse({
    type: CreateBookCopyResultDto,
    description: 'Egzemplarz książki został pomyślnie utworzony',
  })
  @ApiBadRequestResponse({ description: 'Książka nie istnieje' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.EMPLOYEE)
  @Post(':id/copies')
  async createBookCopy(
    @Param() params: CreateBookCopyParamsDto,
    @Body() copy: CreateBookCopyBodyDto,
  ): Promise<CreateBookCopyResultDto> {
    const command = new CreateBookCopyCommand(params.bookId, copy);
    const result = await this.executeCommand<CreateBookCopyResult>(command);

    return result.copy;
  }

  @ApiOperation({
    summary: 'Usuwanie egzemplarza książki',
    description: `Metoda pozwala na usunięcie egzemplarza książki. Wymagane role: ${Role.ADMIN}/${Role.EMPLOYEE}.`,
  })
  @ApiOkResponse({ description: 'Egzemplarz książki został pomyślnie usunięty' })
  @ApiBadRequestResponse({ description: 'Egzemplarz książki nie istnieje' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.EMPLOYEE)
  @Delete(':id/copies/:copy_id')
  async removeBookCopy(@Param() params: RemoveBookCopyParamsDto): Promise<void> {
    const command = new RemoveBookCopyCommand(params.bookId, params.copyId);

    await this.executeCommand<void>(command);
  }

  @ApiOperation({
    summary: 'Wyszukiwanie wypożyczeń egzemplarza książki',
    description: `Metoda pozwala na wyszukiwanie wypożyczeń egzemplarza książki. Wymagane role: ${Role.ADMIN}/${Role.EMPLOYEE}.`,
  })
  @ApiOkResponse({
    type: FindBookCopyBorrowsResult,
    description: 'Znalezione wypożyczenia egzemplarza książki',
  })
  @ApiBadRequestResponse({ description: 'Egzemplarz książki nie istnieje' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.EMPLOYEE)
  @Get(':id/copies/:copy_id/borrows')
  async findBookCopyBorrows(@Param() params: FindBookCopyBorrowsParamsDto) {
    const query = new FindBookCopyBorrowsQuery(params.bookId, params.copyId);
    const result = await this.executeQuery<FindBookCopyBorrowsResult>(query);

    return result.borrows;
  }

  @ApiOperation({
    summary: 'Wyszukiwanie wypożyczenia egzemplarza książki',
    description: `Metoda pozwala na wyszukiwanie wypożyczenia egzemplarza książki. Wymagane role: ${Role.ADMIN}/${Role.EMPLOYEE}.`,
  })
  @ApiOkResponse({
    type: FindBookCopyBorrowResult,
    description: 'Znalezione wypożyczenie egzemplarza książki',
  })
  @ApiBadRequestResponse({
    description: 'Egzemplarz książki nie istnieje / Wypożyczenie nie istnieje',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.EMPLOYEE)
  @Get(':id/copies/:copy_id/borrows/:borrow_id')
  async findBookCopyBorrow(@Param() params: FindBookCopyBorrowParamsDto) {
    const query = new FindBookCopyBorrowQuery(params.bookId, params.copyId, params.borrowId);
    const result = await this.executeQuery<FindBookCopyBorrowResult>(query);

    return result.borrow;
  }

  @ApiOperation({
    summary: 'Tworzenie wypożyczanie egzemplarza książki',
    description: `Metoda pozwala na utworzenie wypożyczenia egzemplarza książki. ${Role.ADMIN}/${Role.EMPLOYEE}/${Role.CUSTOMER}.`,
  })
  @ApiOkResponse({
    description: 'Egzemplarz został pomyślnie wypożyczony',
    type: CreateBookCopyBorrowResultDto,
  })
  @ApiBadRequestResponse({
    description: 'Egzemplarz książki nie istnieje / Użytkownik nie istnieje',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.EMPLOYEE, Role.CUSTOMER)
  @Post(':id/copies/:copy_id/borrows')
  async createBookCopyBorrow(
    @Param() params: CreateBookCopyBorrowParamsDto,
    @Body() borrow: CreateBookCopyBorrowBodyDto,
  ) {
    const command = new CreateBookCopyBorrowCommand(params.bookId, params.copyId, borrow);
    const result = await this.executeCommand<CreateBookCopyBorrowResult>(command);

    return result.borrow;
  }

  @ApiOperation({
    summary: 'Zwracanie wypożyczenie egzemplarza książki',
    description: `Metoda pozwala na zwrócenie egzemplarza książki. Wymagane role: ${Role.ADMIN}/${Role.EMPLOYEE}/${Role.CUSTOMER}.`,
  })
  @ApiOkResponse({
    description: 'Wypożyczenie egzemplarza książki zostało pomyślnie zwrócone',
    type: GiveBackBookCopyResultDto,
  })
  @ApiBadRequestResponse({
    description: 'Egzemplarz książki nie istnieje / Wypożyczenie nie istnieje',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.EMPLOYEE, Role.CUSTOMER)
  @Put(':id/copies/:copy_id/borrows/:borrow_id')
  async giveBackBookCopyBorrow(@Param() params: GiveBackBookCopyParamsDto) {
    const command = new GiveBackBookCopyCommand(params.bookId, params.copyId, params.borrowId);
    const result = await this.executeCommand<GiveBackBookCopyResult>(command);

    return result.borrow;
  }

  @ApiOperation({
    summary: 'Usuwanie wypożyczenia egzemplarza książki',
    description: `Metoda pozwala na usunięcie wypożyczenia egzemplarza książki. Wymagane role: ${Role.ADMIN}/${Role.EMPLOYEE}/${Role.CUSTOMER}.`,
  })
  @ApiOkResponse({ description: 'Wypożyczenie egzemplarza książki zostało pomyślnie usunięte' })
  @ApiBadRequestResponse({
    description: 'Egzemplarz książki nie istnieje / Wypożyczenie nie istnieje',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.EMPLOYEE, Role.CUSTOMER)
  @Delete(':id/copies/:copy_id/borrows/:borrow_id')
  async removeBookCopyBorrow(@Param() params: RemoveBookCopyBorrowParamsDto) {
    const command = new RemoveBookCopyBorrowCommand(params.bookId, params.copyId, params.borrowId);

    await this.executeCommand<void>(command);
  }

  @ApiOperation({
    summary: 'Pobieranie ocen książki',
    description: 'Metoda pozwala na pobranie ocen książki.',
  })
  @ApiOkResponse({
    description: 'Znalezione oceny',
    type: FindBookRatingsResultDto,
  })
  @ApiBadRequestResponse({
    description: 'Książka nie istnieje',
  })
  @Get(':id/ratings')
  async findBookRatings(@Param() params: FindBookRatingsParamsDto) {
    const query = new FindBookRatingsQuery(params.id);
    const result = await this.executeQuery<FindBookRatingsResult>(query);

    return result.ratings;
  }

  @ApiOperation({
    summary: 'Tworzenie oceny książki',
    description: `Metoda pozwala na utworzenia oceny książki. Wymagane role: ${Role.ADMIN}/${Role.EMPLOYEE}/${Role.CUSTOMER}.`,
  })
  @ApiOkResponse({
    description: 'Ocena została pomyślnie utworzona',
    type: CreateUpdateBookRatingResultDto,
  })
  @ApiBadRequestResponse({ description: 'Książka nie istnieje' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.EMPLOYEE, Role.CUSTOMER)
  @Post(':id/ratings')
  async createBookRating(
    @Param() params: CreateUpdateBookRatingParamsDto,
    @Body() rating: CreateUpdateBookRatingBodyDto,
  ) {
    const command = new CreateBookRatingCommand(params.bookId, rating);
    const result = await this.executeCommand<CreateBookRatingResult>(command);

    return result.rating;
  }

  @ApiOperation({
    summary: 'Usuwanie oceny książki',
    description: `Metoda pozwala na usunięcie oceny książki. Wymagane role: ${Role.ADMIN}/${Role.EMPLOYEE}/${Role.CUSTOMER}.`,
  })
  @ApiOkResponse({ description: 'Ocena została pomyślnie usunięta' })
  @ApiBadRequestResponse({ description: 'Ocena nie istnieje' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id/ratings/:rating_id')
  async removeBookRating(@Param() params: RemoveBookRatingParamsDto) {
    const command = new RemoveBookRatingCommand(params.bookId, params.ratingId);

    await this.executeCommand<void>(command);
  }
}
