import { BookType } from '@/modules/books/enums/book-type.enum';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';

export class BooksFilter {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    title: 'Tytuł',
    example: 'Kod Gutenberga',
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
    example: [1, 2, 3],
  })
  genreIds?: number[];

  @IsArray()
  @IsOptional()
  @Type(() => Number)
  @ApiPropertyOptional({
    title: 'Języki',
    example: [1, 2],
  })
  languageIds?: number[];
}
