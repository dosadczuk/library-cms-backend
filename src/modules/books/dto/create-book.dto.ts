import { CreateOrUpdateAuthor } from '@/modules/books/dto/create-or-update-author.dto';
import { CreateOrUpdateGenre } from '@/modules/books/dto/create-or-update-genre.dto';
import { CreateOrUpdateLanguage } from '@/modules/books/dto/create-or-update-language.dto';
import { CreateOrUpdatePublisher } from '@/modules/books/dto/create-or-update-publisher.dto';
import { CreateOrUpdateTag } from '@/modules/books/dto/create-or-update-tag.dto';
import { Book as Entity } from '@/modules/books/entities/book.entity';
import { CONSTRAINTS, METADATA } from '@/modules/books/entities/book.props';
import { BookType } from '@/modules/books/enums/book-type.enum';
import { File } from '@/modules/files/entities/file.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateBook {
  @IsString()
  @IsNotEmpty()
  @MinLength(CONSTRAINTS.isbn.minLength)
  @MaxLength(CONSTRAINTS.isbn.maxLength)
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

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    title: METADATA.description.title,
    nullable: CONSTRAINTS.description.nullable,
  })
  description?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    title: METADATA.image.title,
    nullable: CONSTRAINTS.image.nullable,
  })
  imageId?: string;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({
    example: '1998-07-14',
    title: METADATA.issueDate.title,
    nullable: CONSTRAINTS.issueDate.nullable,
  })
  issueDate: Date;

  @IsObject()
  @IsNotEmpty()
  @Type(() => CreateOrUpdatePublisher)
  @ApiProperty({
    type: CreateOrUpdatePublisher,
    title: METADATA.publisher.title,
    nullable: CONSTRAINTS.publisher.nullable,
  })
  publisher: CreateOrUpdatePublisher;

  @IsArray()
  @IsNotEmpty()
  @Type(() => CreateOrUpdateAuthor)
  @ApiProperty({
    type: [CreateOrUpdateAuthor],
    title: METADATA.authors.title,
    nullable: CONSTRAINTS.authors.nullable,
  })
  authors: CreateOrUpdateAuthor[];

  @IsEnum(BookType)
  @IsNotEmpty()
  @ApiProperty({
    enum: BookType,
    title: METADATA.type.title,
    nullable: CONSTRAINTS.type.nullable,
  })
  type: BookType;

  @IsObject()
  @IsNotEmpty()
  @Type(() => CreateOrUpdateGenre)
  @ApiProperty({
    type: CreateOrUpdateGenre,
    title: METADATA.genre.title,
    nullable: CONSTRAINTS.genre.nullable,
  })
  genre: CreateOrUpdateGenre;

  @IsObject()
  @IsNotEmpty()
  @Type(() => CreateOrUpdateLanguage)
  @ApiProperty({
    type: CreateOrUpdateLanguage,
    title: METADATA.language.title,
    nullable: CONSTRAINTS.language.nullable,
  })
  language: CreateOrUpdateLanguage;

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
  @Type(() => CreateOrUpdateTag)
  @ApiPropertyOptional({
    type: [CreateOrUpdateTag],
    title: METADATA.tags.title,
    nullable: CONSTRAINTS.tags.nullable,
  })
  tags: CreateOrUpdateTag[] = [];

  @IsObject()
  @IsOptional()
  @ApiPropertyOptional({
    type: Object,
    title: METADATA.details.title,
    nullable: CONSTRAINTS.details.nullable,
  })
  details: Record<string, unknown> = {};

  toEntity(): Entity {
    const book = new Entity();
    book.isbn = this.isbn;
    book.title = this.title;
    book.description = this.description;
    book.issueDate = this.issueDate;
    book.publisher = this.publisher.toEntity();
    book.authors = this.authors.map((it) => it.toEntity());
    book.type = this.type;
    book.genre = this.genre.toEntity();
    book.language = this.language.toEntity();
    book.pages = this.pages;
    book.tags = this.tags.map((it) => it.toEntity());
    book.details = this.details;

    if (this.imageId != null) {
      const image = new File();
      image.id = this.imageId;

      book.image = image;
    }

    return book;
  }
}
