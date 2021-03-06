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
    summary: 'Pobieranie autor??w ksi????ek',
    description: 'Metoda pozwala na pobranie autor??w ksi????ek.',
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
    summary: 'Pobieranie gatunk??w ksi????ek',
    description: 'Metoda pozwala na pobranie gatunk??w ksi????ek.',
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
    summary: 'Pobieranie j??zyk??w ksi????ek',
    description: 'Metoda pozwala na pobranie j??zyk??w ksi????ek.',
  })
  @ApiOkResponse({
    type: FindLanguagesResultDto,
    description: 'Znalezione j??zyki',
  })
  @Get('languages')
  async findLanguages(@Query() filter?: FindLanguagesFilterDto): Promise<FindLanguagesResultDto> {
    const query = new FindLanguagesQuery(filter);
    const result = await this.executeQuery<FindLanguagesResult>(query);

    return result.languages;
  }

  @ApiOperation({
    summary: 'Pobieranie wydawc??w ksi????ek',
    description: 'Metoda pozwala na pobranie wydawc??w ksi????ek.',
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
    summary: 'Pobieranie tag??w ksi????ek',
    description: 'Metoda pozwala na pobranie tag??w ksi????ek.',
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
    summary: 'Pobieranie ksi????ek',
    description: 'Metoda pozwala na pobranie ksi????ek.',
  })
  @ApiOkResponse({
    type: FindBooksResultDto,
    description: 'Znalezione ksi????ki',
  })
  @Get()
  async findAll(@Query() filter?: FindBooksFilterDto): Promise<FindBooksResultDto> {
    const query = new FindBooksQuery(filter);
    const result = await this.executeQuery<FindBooksResult>(query);

    return result.books;
  }

  @ApiOperation({
    summary: 'Pobieranie ksi????ki',
    description: 'Metoda pozwala na pobranie szczeg??????w ksi????ki.',
  })
  @ApiOkResponse({
    type: FindBookResultDto,
    description: 'Znaleziona ksi????ka',
  })
  @ApiBadRequestResponse({ description: 'Ksi????ka nie istnieje' })
  @Get(':id')
  async findOne(@Param() params: FindBookParamsDto): Promise<FindBookResultDto> {
    const query = new FindBookQuery(params.id);
    const result = await this.executeQuery<FindBookResult>(query);

    return result.book;
  }

  @ApiOperation({
    summary: 'Tworzenie ksi????ki',
    description: `Metoda pozwala na utworzenie ksi????ki. Wymagane role: ${Role.ADMIN}/${Role.EMPLOYEE}.`,
  })
  @ApiOkResponse({
    type: CreateUpdateBookResultDto,
    description: 'Ksi????ka zosta??a pomy??lnie utworzona',
  })
  @ApiBadRequestResponse({ description: 'Ksi????ka z podanym ISBN ju?? istnieje' })
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
    summary: 'Modyfikowanie ksi????ki',
    description: `Metoda pozwala na zmodyfikowanie ksi????ki. Wymagane role: ${Role.ADMIN}/${Role.EMPLOYEE}.`,
  })
  @ApiOkResponse({
    type: CreateUpdateBookResultDto,
    description: 'Ksi????ka zosta??a pomy??lnie zmodyfikowana',
  })
  @ApiBadRequestResponse({ description: 'Ksi????ka nie istnieje' })
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
    summary: 'Usuwanie ksi????ki',
    description: `Metoda pozwala na usuni??cia ksi????ki. Wymagane role: ${Role.ADMIN}/${Role.EMPLOYEE}.`,
  })
  @ApiOkResponse({ description: 'Ksi????ka zosta??a pomy??lnie usuni??ta' })
  @ApiBadRequestResponse({ description: 'Ksi????ka nie istnieje' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.EMPLOYEE)
  @Delete(':id')
  async remove(@Param() params: RemoveBookParamsDto): Promise<void> {
    const command = new RemoveBookCommand(params.id);

    await this.executeCommand<void>(command);
  }

  @ApiOperation({
    summary: 'Pobieranie egzemplarzy ksi????ki',
    description: `Metoda pozwala na pobranie egzemplarzy ksi????ki. Wymagane role: ${Role.ADMIN}/${Role.EMPLOYEE}/${Role.CUSTOMER}.`,
  })
  @ApiOkResponse({
    type: FindBookCopiesResultDto,
    description: 'Znalezione egzemplarze ksi????ki',
  })
  @ApiBadRequestResponse({ description: 'Ksi????ka nie istnieje' })
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
    summary: 'Tworzenie egzemplarza ksi????ki',
    description: `Metoda pozwala na utworzenie egzemplarza ksi????ki. Wymagane role: ${Role.ADMIN}/${Role.EMPLOYEE}.`,
  })
  @ApiOkResponse({
    type: CreateBookCopyResultDto,
    description: 'Egzemplarz ksi????ki zosta?? pomy??lnie utworzony',
  })
  @ApiBadRequestResponse({ description: 'Ksi????ka nie istnieje' })
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
    summary: 'Usuwanie egzemplarza ksi????ki',
    description: `Metoda pozwala na usuni??cie egzemplarza ksi????ki. Wymagane role: ${Role.ADMIN}/${Role.EMPLOYEE}.`,
  })
  @ApiOkResponse({ description: 'Egzemplarz ksi????ki zosta?? pomy??lnie usuni??ty' })
  @ApiBadRequestResponse({ description: 'Egzemplarz ksi????ki nie istnieje' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.EMPLOYEE)
  @Delete(':id/copies/:copy_id')
  async removeBookCopy(@Param() params: RemoveBookCopyParamsDto): Promise<void> {
    const command = new RemoveBookCopyCommand(params.bookId, params.copyId);

    await this.executeCommand<void>(command);
  }

  @ApiOperation({
    summary: 'Wyszukiwanie wypo??ycze?? egzemplarza ksi????ki',
    description: `Metoda pozwala na wyszukiwanie wypo??ycze?? egzemplarza ksi????ki. Wymagane role: ${Role.ADMIN}/${Role.EMPLOYEE}.`,
  })
  @ApiOkResponse({
    type: FindBookCopyBorrowsResult,
    description: 'Znalezione wypo??yczenia egzemplarza ksi????ki',
  })
  @ApiBadRequestResponse({ description: 'Egzemplarz ksi????ki nie istnieje' })
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
    summary: 'Wyszukiwanie wypo??yczenia egzemplarza ksi????ki',
    description: `Metoda pozwala na wyszukiwanie wypo??yczenia egzemplarza ksi????ki. Wymagane role: ${Role.ADMIN}/${Role.EMPLOYEE}.`,
  })
  @ApiOkResponse({
    type: FindBookCopyBorrowResult,
    description: 'Znalezione wypo??yczenie egzemplarza ksi????ki',
  })
  @ApiBadRequestResponse({
    description: 'Egzemplarz ksi????ki nie istnieje / Wypo??yczenie nie istnieje',
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
    summary: 'Tworzenie wypo??yczanie egzemplarza ksi????ki',
    description: `Metoda pozwala na utworzenie wypo??yczenia egzemplarza ksi????ki. ${Role.ADMIN}/${Role.EMPLOYEE}/${Role.CUSTOMER}.`,
  })
  @ApiOkResponse({
    description: 'Egzemplarz zosta?? pomy??lnie wypo??yczony',
    type: CreateBookCopyBorrowResultDto,
  })
  @ApiBadRequestResponse({
    description: 'Egzemplarz ksi????ki nie istnieje / U??ytkownik nie istnieje',
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
    summary: 'Zwracanie wypo??yczenie egzemplarza ksi????ki',
    description: `Metoda pozwala na zwr??cenie egzemplarza ksi????ki. Wymagane role: ${Role.ADMIN}/${Role.EMPLOYEE}/${Role.CUSTOMER}.`,
  })
  @ApiOkResponse({
    description: 'Wypo??yczenie egzemplarza ksi????ki zosta??o pomy??lnie zwr??cone',
    type: GiveBackBookCopyResultDto,
  })
  @ApiBadRequestResponse({
    description: 'Egzemplarz ksi????ki nie istnieje / Wypo??yczenie nie istnieje',
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
    summary: 'Usuwanie wypo??yczenia egzemplarza ksi????ki',
    description: `Metoda pozwala na usuni??cie wypo??yczenia egzemplarza ksi????ki. Wymagane role: ${Role.ADMIN}/${Role.EMPLOYEE}/${Role.CUSTOMER}.`,
  })
  @ApiOkResponse({ description: 'Wypo??yczenie egzemplarza ksi????ki zosta??o pomy??lnie usuni??te' })
  @ApiBadRequestResponse({
    description: 'Egzemplarz ksi????ki nie istnieje / Wypo??yczenie nie istnieje',
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
    summary: 'Pobieranie ocen ksi????ki',
    description: 'Metoda pozwala na pobranie ocen ksi????ki.',
  })
  @ApiOkResponse({
    description: 'Znalezione oceny',
    type: FindBookRatingsResultDto,
  })
  @ApiBadRequestResponse({
    description: 'Ksi????ka nie istnieje',
  })
  @Get(':id/ratings')
  async findBookRatings(@Param() params: FindBookRatingsParamsDto) {
    const query = new FindBookRatingsQuery(params.id);
    const result = await this.executeQuery<FindBookRatingsResult>(query);

    return result.ratings;
  }

  @ApiOperation({
    summary: 'Tworzenie oceny ksi????ki',
    description: `Metoda pozwala na utworzenia oceny ksi????ki. Wymagane role: ${Role.ADMIN}/${Role.EMPLOYEE}/${Role.CUSTOMER}.`,
  })
  @ApiOkResponse({
    description: 'Ocena zosta??a pomy??lnie utworzona',
    type: CreateUpdateBookRatingResultDto,
  })
  @ApiBadRequestResponse({ description: 'Ksi????ka nie istnieje' })
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
    summary: 'Usuwanie oceny ksi????ki',
    description: `Metoda pozwala na usuni??cie oceny ksi????ki. Wymagane role: ${Role.ADMIN}/${Role.EMPLOYEE}/${Role.CUSTOMER}.`,
  })
  @ApiOkResponse({ description: 'Ocena zosta??a pomy??lnie usuni??ta' })
  @ApiBadRequestResponse({ description: 'Ocena nie istnieje' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id/ratings/:rating_id')
  async removeBookRating(@Param() params: RemoveBookRatingParamsDto) {
    const command = new RemoveBookRatingCommand(params.bookId, params.ratingId);

    await this.executeCommand<void>(command);
  }
}
