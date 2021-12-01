import { BookType } from '@/modules/books/entities/enums/book-type.enum';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

export class BooksFilter {
  @IsOptional()
  @IsNotEmpty()
  @ApiPropertyOptional({
    title: 'Tytuł',
    example: 'Kod Gutenberga',
  })
  title?: string;

  @IsOptional()
  @IsEnum(BookType)
  @ApiPropertyOptional({
    title: 'Rodzaj',
    enum: BookType,
  })
  type?: string;

  @IsOptional()
  @IsArray()
  @Type(() => Number)
  @ApiPropertyOptional({
    title: 'Gatunki',
    example: [1, 2, 3],
  })
  genreIds?: number[];

  @IsOptional()
  @IsArray()
  @Type(() => Number)
  @ApiPropertyOptional({
    title: 'Języki',
    example: [1, 2],
  })
  languageIds?: number[];
}
