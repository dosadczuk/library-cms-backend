import { BookType } from '@/modules/books/enums/book-type.enum';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';

export class BooksFilter {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    title: 'Tytuł',
  })
  title?: string;

  @IsEnum(BookType)
  @IsOptional()
  @ApiPropertyOptional({
    title: 'Rodzaj',
    enum: BookType,
  })
  type?: string;

  @IsArray()
  @IsOptional()
  @Type(() => Number)
  @ApiPropertyOptional({
    title: 'Gatunki',
  })
  genreIds?: number[];

  @IsArray()
  @IsOptional()
  @Type(() => Number)
  @ApiPropertyOptional({
    title: 'Języki',
  })
  languageIds?: number[];
}
