import { BookType } from '@/modules/books/entities/enums';
import { BookViewModel } from '@/modules/books/vms';
import { TypeNumber } from '@/shared/utils/class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from '@/shared/utils/class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class FindBooksFilterDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @MaxLength(255)
  @ApiPropertyOptional({
    description: 'Tytuł',
    maxLength: 255,
  })
  readonly title?: string;

  @IsEnum(BookType)
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Rodzaj',
    enum: BookType,
    nullable: false,
  })
  readonly type?: string;

  @IsArray()
  @IsNotEmpty()
  @IsOptional()
  @TypeNumber()
  @ApiPropertyOptional({
    description: 'Gatunki',
  })
  readonly genreIds?: number[];

  @IsArray()
  @IsNotEmpty()
  @IsOptional()
  @TypeNumber()
  @ApiPropertyOptional({
    description: 'Języki',
  })
  readonly languageIds?: number[];
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
