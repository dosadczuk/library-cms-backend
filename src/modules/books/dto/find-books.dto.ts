import { BookType } from '@/modules/books/entities/enums/book-type.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { BookViewModel } from '@/modules/books/vms/book.vm';

export class FindBooksFilterDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @MaxLength(255)
  @ApiPropertyOptional({
    title: 'Tytuł',
    maxLength: 255,
  })
  title?: string;

  @IsEnum(BookType)
  @IsOptional()
  @ApiPropertyOptional({
    title: 'Rodzaj',
    enum: BookType,
    nullable: false,
  })
  type?: string;

  @IsArray()
  @IsNotEmpty()
  @IsOptional()
  @Type(() => Number)
  @ApiPropertyOptional({
    title: 'Gatunki',
  })
  genreIds?: number[];

  @IsArray()
  @IsNotEmpty()
  @IsOptional()
  @Type(() => Number)
  @ApiPropertyOptional({
    title: 'Języki',
  })
  languageIds?: number[];
}

export class FindBooksResultDto {
  @ApiProperty({
    title: 'Znalezione książki',
    type: [BookViewModel],
  })
  readonly books: BookViewModel[];

  constructor(books: BookViewModel[]) {
    this.books = books;
  }
}
