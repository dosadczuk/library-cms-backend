import { CreateUpdateAuthorDto } from '@/modules/books/dto/create-update-author.dto';
import { CreateUpdateBookDto } from '@/modules/books/dto/create-update-book.dto';
import { CreateUpdateGenreDto } from '@/modules/books/dto/create-update-genre.dto';
import { CreateUpdateLanguageDto } from '@/modules/books/dto/create-update-language.dto';
import { CreateUpdatePublisherDto } from '@/modules/books/dto/create-update-publisher.dto';
import { CreateUpdateTagDto } from '@/modules/books/dto/create-update-tag.dto';

export abstract class ManageBookCommand {
  constructor(readonly book: CreateUpdateBookDto) {}

  get publisher(): CreateUpdatePublisherDto {
    return this.book.publisher;
  }

  get authors(): CreateUpdateAuthorDto[] {
    return this.book.authors;
  }

  get genre(): CreateUpdateGenreDto {
    return this.book.genre;
  }

  get language(): CreateUpdateLanguageDto {
    return this.book.language;
  }

  get tags(): CreateUpdateTagDto[] {
    return this.book.tags;
  }
}
