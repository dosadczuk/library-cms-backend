import { Book } from '@/modules/books/entities';
import { AuthorViewModel } from '@/modules/books/vms/author.vm';
import { BookBaseViewModel } from '@/modules/books/vms/book-base.vm';
import { GenreViewModel } from '@/modules/books/vms/genre.vm';
import { LanguageViewModel } from '@/modules/books/vms/language.vm';
import { PublisherViewModel } from '@/modules/books/vms/publisher.vm';
import { TagViewModel } from '@/modules/books/vms/tag.vm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class BookViewModel extends BookBaseViewModel {
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

  @ApiProperty({
    title: 'Średnia ocena',
  })
  readonly ratingAverage: number;

  constructor(book: Book) {
    super(book);

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
    if (book.ratings != null) {
      const sum = book.ratings.reduce((avg, rating) => avg + Number(rating.value), 0);
      const len = book.ratings.length;

      this.ratingAverage = sum / len;
    }
  }
}
