import {
  CreateUpdateAuthorDto as AuthorQueryDto,
  CreateUpdateAuthorResultDto as AuthorResultDto,
} from '@/modules/books/dto/create-update-author.dto';
import {
  CreateUpdateGenreDto as GenreQueryDto,
  CreateUpdateGenreResultDto as GenreResultDto,
} from '@/modules/books/dto/create-update-genre.dto';
import {
  CreateUpdateLanguageDto as LanguageQueryDto,
  CreateUpdateLanguageResultDto as LanguageResultDto,
} from '@/modules/books/dto/create-update-language.dto';
import {
  CreateUpdatePublisherDto as PublisherQueryDto,
  CreateUpdatePublisherResultDto as PublisherResultDto,
} from '@/modules/books/dto/create-update-publisher.dto';
import {
  CreateUpdateTagDto as TagQueryDto,
  CreateUpdateTagResultDto as TagResultDto,
} from '@/modules/books/dto/create-update-tag.dto';
import { Book } from '@/modules/books/entities/book.entity';
import { BookType } from '@/modules/books/entities/enums/book-type.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';

export class CreateUpdateBookDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(13)
  @ApiProperty({
    title: 'ISBN',
    example: '3940023815418',
    minLength: 10,
    maxLength: 13,
    nullable: false,
  })
  isbn: string;

  @IsEnum(BookType)
  @IsNotEmpty()
  @ApiProperty({
    title: 'Rodzaj książki',
    example: BookType.BOOK,
    enum: BookType,
    nullable: false,
  })
  type: BookType;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @ApiProperty({
    title: 'Tytuł książki',
    example: 'Kod Gutenberga',
    maxLength: 255,
    nullable: false,
  })
  title: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    title: 'Opis książki',
    nullable: true,
  })
  description?: string;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({
    title: 'Data wydania',
    example: '1998-07-14',
    format: 'YYYY-MM-DD',
    nullable: false,
  })
  issueDate: Date;

  @IsObject()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => PublisherQueryDto)
  @ApiProperty({
    title: 'Wydawca',
    type: PublisherQueryDto,
    nullable: false,
  })
  publisher: PublisherQueryDto;

  @IsArray()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => AuthorQueryDto)
  @ApiProperty({
    title: 'Autorzy',
    type: [AuthorQueryDto],
    nullable: false,
  })
  authors: AuthorQueryDto[];

  @IsObject()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => GenreQueryDto)
  @ApiProperty({
    title: 'Gatunek',
    type: GenreQueryDto,
    nullable: false,
  })
  genre: GenreQueryDto;

  @IsArray()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => LanguageQueryDto)
  @ApiProperty({
    title: 'Język',
    type: LanguageQueryDto,
    nullable: false,
  })
  language: LanguageQueryDto;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    title: 'Liczba stron',
    example: 110,
    nullable: false,
  })
  pages: number;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    title: 'Identyfikator obrazka',
    example: 'a619817c-9bc5-4fe9-850d-958360a549e3',
    nullable: true,
  })
  imageId?: string;

  @IsObject()
  @IsOptional()
  @ApiPropertyOptional({
    title: 'Szczegóły książki',
    nullable: true,
  })
  details: Record<string, unknown> = {};

  @IsArray()
  @IsOptional()
  @ApiPropertyOptional({
    title: 'Tagi',
    type: [TagQueryDto],
    nullable: true,
  })
  tags: TagQueryDto[] = [];
}

export class CreateUpdateBookResultDto {
  @ApiProperty({
    title: 'Identyfikator',
    example: 1,
  })
  readonly id: number;

  @ApiProperty({
    title: 'ISBN',
    example: '3940023815418',
  })
  readonly isbn: string;

  @ApiProperty({
    title: 'Rodzaj książki',
    example: BookType.BOOK,
    enum: BookType,
  })
  readonly type: BookType;

  @ApiProperty({
    title: 'Tytuł książki',
    example: 'Kod Gutenberga',
  })
  readonly title: string;

  @ApiPropertyOptional({
    title: 'Opis książki',
  })
  readonly description?: string;

  @ApiProperty({
    title: 'Data wydania',
    example: '1998-07-14',
    format: 'YYYY-MM-DD',
  })
  readonly issueDate: Date;

  @ApiProperty({
    title: 'Wydawca',
    type: PublisherResultDto,
  })
  readonly publisher: PublisherResultDto;

  @ApiProperty({
    title: 'Autorzy',
    type: [AuthorResultDto],
  })
  readonly authors: AuthorResultDto[];

  @ApiProperty({
    title: 'Gatunek',
    type: GenreResultDto,
  })
  readonly genre: GenreResultDto;

  @ApiProperty({
    title: 'Język',
    type: LanguageResultDto,
  })
  readonly language: LanguageResultDto;

  @ApiProperty({
    title: 'Liczba stron',
    example: 110,
  })
  readonly pages: number;

  @ApiPropertyOptional({
    title: 'Identyfikator obrazka',
    example: 'a619817c-9bc5-4fe9-850d-958360a549e3',
  })
  readonly imageId?: string;

  @ApiProperty({
    title: 'Szczegóły książki',
  })
  readonly details: Record<string, unknown> = {};

  @ApiProperty({
    title: 'Tagi',
    type: [TagResultDto],
  })
  readonly tags: TagResultDto[] = [];

  constructor(book: Book) {
    this.id = book.id;
    this.isbn = book.isbn;
    this.type = book.type;
    this.title = book.title;
    this.description = book.description;
    this.issueDate = book.issueDate;
    this.publisher = new PublisherResultDto(book.publisher);
    this.authors = book.authors.map((it) => new AuthorResultDto(it));
    this.genre = new GenreResultDto(book.genre);
    this.language = new LanguageResultDto(book.language);
    this.pages = book.pages;
    this.imageId = book.image?.id;
    this.details = book.details;
    this.tags = book.tags.map((it) => new TagResultDto(it));
  }
}
