import { CreateUpdateAuthorBodyDto as AuthorQueryDto } from '@/modules/books/dto/create-update-author.dto';
import { CreateUpdateGenreBodyDto as GenreQueryDto } from '@/modules/books/dto/create-update-genre.dto';
import { CreateUpdateLanguageBodyDto as LanguageQueryDto } from '@/modules/books/dto/create-update-language.dto';
import { CreateUpdatePublisherBodyDto as PublisherQueryDto } from '@/modules/books/dto/create-update-publisher.dto';
import { CreateUpdateTagBodyDto as TagQueryDto } from '@/modules/books/dto/create-update-tag.dto';
import { BookType } from '@/modules/books/entities/enums/book-type.enum';
import { BookViewModel } from '@/modules/books/vms/book.vm';
import { TypeNumber } from '@/shared/decorators/class-transformer';
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
} from '@/shared/decorators/class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class UpdateBookParamsDto {
  @IsInt()
  @IsNotEmpty()
  @TypeNumber()
  @ApiProperty({
    title: 'Identyfikator książki',
    example: 1,
  })
  readonly id: number;
}

export class CreateUpdateBookBodyDto {
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
  readonly isbn: string;

  @IsEnum(BookType)
  @IsNotEmpty()
  @ApiProperty({
    title: 'Rodzaj książki',
    example: BookType.BOOK,
    enum: BookType,
    nullable: false,
  })
  readonly type: BookType;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @ApiProperty({
    title: 'Tytuł książki',
    example: 'Kod Gutenberga',
    maxLength: 255,
    nullable: false,
  })
  readonly title: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    title: 'Opis książki',
    nullable: true,
  })
  readonly description?: string;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({
    title: 'Data wydania',
    example: '1998-07-14',
    format: 'YYYY-MM-DD',
    nullable: false,
  })
  readonly issueDate: Date;

  @IsObject()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => PublisherQueryDto)
  @ApiProperty({
    title: 'Wydawca',
    type: PublisherQueryDto,
    nullable: false,
  })
  readonly publisher: PublisherQueryDto;

  @IsArray()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => AuthorQueryDto)
  @ApiProperty({
    title: 'Autorzy',
    type: [AuthorQueryDto],
    nullable: false,
  })
  readonly authors: AuthorQueryDto[];

  @IsObject()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => GenreQueryDto)
  @ApiProperty({
    title: 'Gatunek',
    type: GenreQueryDto,
    nullable: false,
  })
  readonly genre: GenreQueryDto;

  @IsArray()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => LanguageQueryDto)
  @ApiProperty({
    title: 'Język',
    type: LanguageQueryDto,
    nullable: false,
  })
  readonly language: LanguageQueryDto;

  @IsInt()
  @IsNotEmpty()
  @TypeNumber()
  @ApiProperty({
    title: 'Liczba stron',
    example: 110,
    nullable: false,
  })
  readonly pages: number;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    title: 'Identyfikator obrazka',
    example: 'a619817c-9bc5-4fe9-850d-958360a549e3',
    nullable: true,
  })
  readonly imageId?: string;

  @IsObject()
  @IsOptional()
  @ApiPropertyOptional({
    title: 'Szczegóły książki',
    nullable: true,
  })
  readonly details: Record<string, unknown> = {};

  @IsArray()
  @IsOptional()
  @ApiPropertyOptional({
    title: 'Tagi',
    type: [TagQueryDto],
    nullable: true,
  })
  readonly tags: TagQueryDto[] = [];
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
