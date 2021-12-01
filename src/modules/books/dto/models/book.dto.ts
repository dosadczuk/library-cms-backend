import { Author } from '@/modules/books/dto/models/author.dto';
import { Genre } from '@/modules/books/dto/models/genre.dto';
import { Language } from '@/modules/books/dto/models/language.dto';
import { Publisher } from '@/modules/books/dto/models/publisher.dto';
import { Tag } from '@/modules/books/dto/models/tag.dto';
import { CONSTRAINTS, METADATA } from '@/modules/books/entities/book.entity';
import { BookType } from '@/modules/books/entities/enums/book-type.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class Book {
  @IsString()
  @IsNotEmpty()
  @MinLength(CONSTRAINTS.isbn.minLength)
  @MaxLength(CONSTRAINTS.isbn.minLength)
  @ApiProperty({
    example: '3940023815418',
    title: METADATA.isbn.title,
    minLength: CONSTRAINTS.isbn.minLength,
    maxLength: CONSTRAINTS.isbn.maxLength,
    nullable: CONSTRAINTS.isbn.nullable,
  })
  isbn: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(CONSTRAINTS.title.maxLength)
  @ApiProperty({
    example: 'Kod Gutenberga',
    title: METADATA.title.title,
    maxLength: CONSTRAINTS.title.maxLength,
    nullable: CONSTRAINTS.title.nullable,
  })
  title: string;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty({
    example: '1998-07-14',
    title: METADATA.issueDate.title,
    nullable: CONSTRAINTS.issueDate.nullable,
  })
  issueDate: Date;

  @IsObject()
  @IsNotEmpty()
  @ApiProperty({
    type: Publisher,
    title: METADATA.publisher.title,
    nullable: CONSTRAINTS.publisher.nullable,
  })
  publisher: Publisher;

  @IsArray()
  @IsNotEmpty()
  @Type(() => Author)
  @ApiProperty({
    type: [Author],
    title: METADATA.authors.title,
    nullable: CONSTRAINTS.authors.nullable,
  })
  authors: Author[];

  @IsEnum(BookType)
  @IsNotEmpty()
  @ApiProperty({
    enum: BookType,
    title: METADATA.type.title,
    nullable: CONSTRAINTS.type.nullable,
  })
  type: BookType;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: Genre,
    title: METADATA.genre.title,
    nullable: CONSTRAINTS.genre.nullable,
  })
  genre: Genre;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: Language,
    title: METADATA.language.title,
    nullable: CONSTRAINTS.language.nullable,
  })
  language: Language;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    example: 152,
    title: METADATA.pages.title,
    nullable: CONSTRAINTS.pages.nullable,
  })
  pages: number;

  @IsArray()
  @IsOptional()
  @ApiPropertyOptional({
    type: [Tag],
    title: METADATA.tags.title,
    nullable: CONSTRAINTS.tags.nullable,
  })
  tags: Tag[] = [];

  @IsObject()
  @IsOptional()
  @ApiPropertyOptional({
    type: Object,
    title: METADATA.details.title,
    nullable: CONSTRAINTS.details.nullable,
  })
  details: Record<string, unknown> = {};
}
