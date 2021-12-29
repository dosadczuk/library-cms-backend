import { Book } from '@/modules/books/entities';
import { BookType } from '@/modules/books/entities/enums';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class BookBaseViewModel {
  @ApiProperty({
    title: 'Identyfikator',
    example: 1,
  })
  readonly id: number;

  @ApiProperty({
    title: 'ISBN',
    example: '3940023815418',
  })
  readonly isbn: string;

  @ApiProperty({
    enum: BookType,
    title: 'Rodzaj książki',
    example: BookType.MAGAZINE,
  })
  readonly type: BookType;

  @ApiProperty({
    title: 'Tytuł',
    example: 'Kod Gutenberga',
  })
  readonly title: string;

  @ApiPropertyOptional({
    title: 'Opis',
    example: 'Przykładowy opis książki',
  })
  readonly description?: string;

  constructor(book: Book) {
    this.id = book.id;
    this.isbn = book.isbn;
    this.type = book.type;
    this.title = book.title;
    this.description = book.description;
  }
}
