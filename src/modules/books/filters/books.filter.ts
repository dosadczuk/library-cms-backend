import { BookType } from '@/modules/books/entities/book.entity';
import { TransformNumberArray } from '@/shared/decorators/class-transformer';
import { IsArray, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

export class BooksFilter {
  @IsOptional()
  @IsNotEmpty()
  title?: string;

  @IsOptional()
  @IsEnum(BookType)
  type?: string;

  @IsOptional()
  @IsArray()
  @TransformNumberArray()
  genreIds?: number[];

  @IsOptional()
  @IsArray()
  @TransformNumberArray()
  languageIds?: number[];
}
