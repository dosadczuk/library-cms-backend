import {
  CreateBookBodyDto,
  CreateBookCopyBodyDto,
  CreateUpdateAuthorBodyDto,
  CreateUpdateGenreBodyDto,
  CreateUpdateLanguageBodyDto,
  CreateUpdatePublisherBodyDto,
  CreateUpdateTagBodyDto,
  UpdateBookBodyDto,
} from '@/modules/books/dto';

export abstract class ManageBookCommand {
  constructor(readonly book: CreateBookBodyDto | UpdateBookBodyDto) {}

  get publisher(): CreateUpdatePublisherBodyDto {
    return this.book.publisher;
  }

  get authors(): CreateUpdateAuthorBodyDto[] {
    return this.book.authors;
  }

  get genre(): CreateUpdateGenreBodyDto {
    return this.book.genre;
  }

  get language(): CreateUpdateLanguageBodyDto {
    return this.book.language;
  }

  get tags(): CreateUpdateTagBodyDto[] {
    return this.book.tags;
  }

  get copies(): CreateBookCopyBodyDto[] {
    return this.book.copies;
  }
}
