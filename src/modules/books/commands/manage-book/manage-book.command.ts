import {
  CreateUpdateAuthorBodyDto,
  CreateUpdateBookBodyDto,
  CreateUpdateGenreBodyDto,
  CreateUpdateLanguageBodyDto,
  CreateUpdatePublisherBodyDto,
  CreateUpdateTagBodyDto,
} from '@/modules/books/dto';

export abstract class ManageBookCommand {
  constructor(readonly book: CreateUpdateBookBodyDto) {}

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
}
