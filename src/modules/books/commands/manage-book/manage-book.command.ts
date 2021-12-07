import { CreateUpdateAuthorBodyDto } from '@/modules/books/dto/create-update-author.dto';
import { CreateUpdateBookBodyDto } from '@/modules/books/dto/create-update-book.dto';
import { CreateUpdateGenreBodyDto } from '@/modules/books/dto/create-update-genre.dto';
import { CreateUpdateLanguageBodyDto } from '@/modules/books/dto/create-update-language.dto';
import { CreateUpdatePublisherBodyDto } from '@/modules/books/dto/create-update-publisher.dto';
import { CreateUpdateTagBodyDto } from '@/modules/books/dto/create-update-tag.dto';

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
