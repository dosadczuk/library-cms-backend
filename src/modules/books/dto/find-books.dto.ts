import { BookType } from '@/modules/books/entities/book.entity';
import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';

export class FindBooksDto {
  @IsString()
  @IsOptional()
  isbn?: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsArray()
  @IsOptional()
  publisherIds?: number[];

  @IsArray()
  @IsOptional()
  authorIds?: number[];

  @IsEnum(BookType)
  @IsOptional()
  type?: string;

  @IsArray()
  @IsOptional()
  genreIds?: number[];

  @IsArray()
  @IsOptional()
  languageIds?: number[];

  @IsArray()
  @IsOptional()
  tagIds?: number[];
}
