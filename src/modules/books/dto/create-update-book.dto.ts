import { CreateUpdateAuthorBodyDto } from '@/modules/books/dto/create-update-author.dto';
import { CreateUpdateGenreBodyDto } from '@/modules/books/dto/create-update-genre.dto';
import { CreateUpdateLanguageBodyDto } from '@/modules/books/dto/create-update-language.dto';
import { CreateUpdatePublisherBodyDto } from '@/modules/books/dto/create-update-publisher.dto';
import { CreateUpdateTagBodyDto } from '@/modules/books/dto/create-update-tag.dto';
import { BookType } from '@/modules/books/entities/enums';
import { BookViewModel } from '@/modules/books/vms';
import { TypeNumber } from '@/shared/utils/class-transformer';
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
} from '@/shared/utils/class-validator';
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
  @Type(() => CreateUpdatePublisherBodyDto)
  @ApiProperty({
    title: 'Wydawca',
    type: CreateUpdatePublisherBodyDto,
    nullable: false,
  })
  readonly publisher: CreateUpdatePublisherBodyDto;

  @IsArray()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateUpdateAuthorBodyDto)
  @ApiProperty({
    title: 'Autorzy',
    type: [CreateUpdateAuthorBodyDto],
    nullable: false,
  })
  readonly authors: CreateUpdateAuthorBodyDto[];

  @IsObject()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateUpdateGenreBodyDto)
  @ApiProperty({
    title: 'Gatunek',
    type: CreateUpdateGenreBodyDto,
    nullable: false,
  })
  readonly genre: CreateUpdateGenreBodyDto;

  @IsArray()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateUpdateLanguageBodyDto)
  @ApiProperty({
    title: 'Język',
    type: CreateUpdateLanguageBodyDto,
    nullable: false,
  })
  readonly language: CreateUpdateLanguageBodyDto;

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
    type: [CreateUpdateTagBodyDto],
    nullable: true,
  })
  readonly tags: CreateUpdateTagBodyDto[] = [];
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
