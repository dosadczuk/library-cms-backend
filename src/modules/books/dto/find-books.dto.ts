import { BookType } from '@/modules/books/entities/enums/book-type.enum';
import { BookViewModel } from '@/modules/books/vms/book.vm';
import { TypeNumber } from '@/shared/decorators/class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from '@/shared/decorators/class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class FindBooksFilterDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @MaxLength(255)
  @ApiPropertyOptional({
    title: 'Tytuł',
    maxLength: 255,
  })
  readonly title?: string;

  @IsEnum(BookType)
  @IsOptional()
  @ApiPropertyOptional({
    title: 'Rodzaj',
    enum: BookType,
    nullable: false,
  })
  readonly type?: string;

  @IsArray()
  @IsNotEmpty()
  @IsOptional()
  @TypeNumber()
  @ApiPropertyOptional({
    title: 'Gatunki',
  })
  readonly genreIds?: number[];

  @IsArray()
  @IsNotEmpty()
  @IsOptional()
  @TypeNumber()
  @ApiPropertyOptional({
    title: 'Języki',
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
