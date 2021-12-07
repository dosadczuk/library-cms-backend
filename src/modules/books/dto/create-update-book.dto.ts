import { CreateUpdateAuthorDto as AuthorQueryDto } from '@/modules/books/dto/create-update-author.dto';
import { CreateUpdateGenreDto as GenreQueryDto } from '@/modules/books/dto/create-update-genre.dto';
import { CreateUpdateLanguageDto as LanguageQueryDto } from '@/modules/books/dto/create-update-language.dto';
import { CreateUpdatePublisherDto as PublisherQueryDto } from '@/modules/books/dto/create-update-publisher.dto';
import { CreateUpdateTagDto as TagQueryDto } from '@/modules/books/dto/create-update-tag.dto';
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
import { BookViewModel } from '@/modules/books/vms/book.vm';

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
    title: 'Utworzona/zmodyfikowana książka',
  })
  readonly book: BookViewModel;

  constructor(book: BookViewModel) {
    this.book = book;
  }
}
