import { METADATA } from '@/modules/books/entities/metadata/book.metadata';
import { BookType } from '@/modules/books/enums/book-type.enum';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';

export class BooksFilter {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    title: METADATA.title.title,
  })
  title?: string;

  @IsEnum(BookType)
  @IsOptional()
  @ApiPropertyOptional({
    title: METADATA.type.title,
    enum: BookType,
  })
  type?: string;

  @IsArray()
  @IsOptional()
  @Type(() => Number)
  @ApiPropertyOptional({
    title: METADATA.genre.title,
  })
  genreIds?: number[];

  @IsArray()
  @IsOptional()
  @Type(() => Number)
  @ApiPropertyOptional({
    title: METADATA.language.title,
  })
  languageIds?: number[];
}
