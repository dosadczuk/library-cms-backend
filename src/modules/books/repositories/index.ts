import { AuthorRepository } from '@/modules/books/repositories/author.repository';
import { BookRepository } from '@/modules/books/repositories/book.repository';
import { GenreRepository } from '@/modules/books/repositories/genre.repository';
import { LanguageRepository } from '@/modules/books/repositories/language.repository';
import { PublisherRepository } from '@/modules/books/repositories/publisher.repository';
import { TagRepository } from '@/modules/books/repositories/tag.repository';

export * from '@/modules/books/repositories/author.repository';
export * from '@/modules/books/repositories/book.repository';
export * from '@/modules/books/repositories/genre.repository';
export * from '@/modules/books/repositories/language.repository';
export * from '@/modules/books/repositories/publisher.repository';
export * from '@/modules/books/repositories/tag.repository';

export const Repositories = [
  AuthorRepository,
  BookRepository,
  GenreRepository,
  LanguageRepository,
  PublisherRepository,
  TagRepository,
];
