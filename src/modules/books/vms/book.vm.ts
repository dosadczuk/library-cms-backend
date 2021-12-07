import { Book } from '@/modules/books/entities/book.entity';
import { BookType } from '@/modules/books/entities/enums/book-type.enum';
import { AuthorViewModel } from '@/modules/books/vms/author.vm';
import { GenreViewModel } from '@/modules/books/vms/genre.vm';
import { LanguageViewModel } from '@/modules/books/vms/language.vm';
import { PublisherViewModel } from '@/modules/books/vms/publisher.vm';
import { TagViewModel } from '@/modules/books/vms/tag.vm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class BookViewModel {
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

  @ApiProperty({
    title: 'Data wydania',
    example: '1982-02-02',
  })
  readonly issueDate: Date;

  @ApiPropertyOptional({
    type: PublisherViewModel,
    title: 'Wydawca',
  })
  readonly publisher?: PublisherViewModel;

  @ApiPropertyOptional({
    type: [AuthorViewModel],
    title: 'Autorzy',
  })
  readonly authors?: AuthorViewModel[];

  @ApiPropertyOptional({
    type: GenreViewModel,
    title: 'Gatunek',
  })
  readonly genre?: GenreViewModel;

  @ApiPropertyOptional({
    type: LanguageViewModel,
    title: 'Język',
  })
  readonly language?: LanguageViewModel;

  @ApiProperty({
    title: 'Liczba stron',
    example: 250,
  })
  readonly pages: number;

  @ApiProperty({
    title: 'Identyfikator obrazka',
    example: 'f2db336a-bb43-4de7-ad6f-32b350a3c32f',
  })
  readonly imageId?: string;

  @ApiProperty({
    title: 'Szczegóły',
  })
  readonly details: Record<string, unknown>;

  @ApiPropertyOptional({
    type: [TagViewModel],
    title: 'Tagi',
  })
  readonly tags?: TagViewModel[] = null;

  constructor(book: Book) {
    this.id = book.id;
    this.isbn = book.isbn;
    this.type = book.type;
    this.title = book.title;
    this.description = book.description;
    this.issueDate = book.issueDate;
    if (book.publisher != null) {
      this.publisher = new PublisherViewModel(book.publisher);
    }
    if (book.authors != null) {
      this.authors = book.authors.map((it) => new AuthorViewModel(it));
    }
    if (book.genre != null) {
      this.genre = new GenreViewModel(book.genre);
    }
    if (book.language != null) {
      this.language = new LanguageViewModel(book.language);
    }
    this.pages = book.pages;
    this.imageId = book.image?.id;
    this.details = book.details;
    if (book.tags != null) {
      this.tags = book.tags.map((it) => new TagViewModel(it));
    }
  }
}
