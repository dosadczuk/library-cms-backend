import { Author } from '@/modules/books/entities/author.entity';
import { Copy } from '@/modules/books/entities/copy.entity';
import { Genre } from '@/modules/books/entities/genre.entity';
import { Language } from '@/modules/books/entities/language.entity';
import { Publisher } from '@/modules/books/entities/publisher.entity';
import { Rating } from '@/modules/books/entities/rating.entity';
import { Tag } from '@/modules/books/entities/tag.entity';
import { BookType } from '@/modules/books/enums/book-type.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export const METADATA = {
  id: { title: 'Identyfikator rekordu' },
  isbn: { title: 'ISBN' },
  title: { title: 'Tytuł' },
  issueDate: { title: 'Data wydania' },
  publisher: { title: 'Wydawca' },
  authors: { title: 'Autorzy' },
  type: { title: 'Rodzaj' },
  genre: { title: 'Gatunek' },
  language: { title: 'Język' },
  pages: { title: 'Liczba stron' },
  tags: { title: 'Tagi' },
  details: { title: 'Szczegółowe informacje' },
  createdAt: { title: 'Moment utworzenia rekordu' },
  modifiedAt: { title: 'Moment modyfikacji rekordu' },
};

export const CONSTRAINTS = {
  isbn: {
    minLength: 10,
    maxLength: 13,
    nullable: false,
  },
  title: {
    maxLength: 255,
    nullable: false,
  },
  issueDate: { nullable: false },
  publisher: { nullable: false },
  authors: { nullable: false },
  type: { nullable: false },
  genre: { nullable: false },
  language: { nullable: false },
  pages: { nullable: false },
  tags: { nullable: false },
  details: { nullable: false },
  copies: { nullable: true },
  ratings: { nullable: true },
};

@Entity({
  name: 'books',
  orderBy: { id: 'ASC' },
})
export class Book {
  @PrimaryGeneratedColumn({
    comment: METADATA.id.title,
    name: 'id',
  })
  id: number;

  @Column({
    comment: METADATA.isbn.title,
    name: 'isbn',
    type: 'varchar',
    unique: true,
    length: CONSTRAINTS.isbn.maxLength,
    nullable: CONSTRAINTS.isbn.nullable,
  })
  isbn: string;

  @Column({
    comment: METADATA.title.title,
    name: 'title',
    type: 'varchar',
    length: CONSTRAINTS.title.maxLength,
    nullable: CONSTRAINTS.title.nullable,
  })
  title: string;

  @Column({
    comment: METADATA.issueDate.title,
    name: 'issue_date',
    type: 'date',
    nullable: CONSTRAINTS.issueDate.nullable,
  })
  issueDate: Date;

  @ManyToOne(() => Publisher, (publisher) => publisher.books, {
    cascade: ['insert'],
    nullable: CONSTRAINTS.publisher.nullable,
  })
  @JoinColumn({
    name: 'publisher_id',
    referencedColumnName: 'id',
  })
  publisher: Publisher;

  @ManyToMany(() => Author, {
    cascade: ['insert'],
    nullable: CONSTRAINTS.authors.nullable,
  })
  @JoinTable({
    name: 'books_authors',
    joinColumn: {
      name: 'book_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'author_id',
      referencedColumnName: 'id',
    },
  })
  authors: Author[];

  @Column({
    comment: METADATA.type.title,
    name: 'type',
    type: 'enum',
    enum: BookType,
    nullable: CONSTRAINTS.type.nullable,
  })
  type: BookType;

  @ManyToOne(() => Genre, (genre) => genre.books, {
    cascade: ['insert'],
    nullable: CONSTRAINTS.genre.nullable,
  })
  @JoinColumn({
    name: 'genre_id',
    referencedColumnName: 'id',
  })
  genre: Genre;

  @ManyToOne(() => Language, (language) => language.books, {
    cascade: ['insert'],
    nullable: CONSTRAINTS.language.nullable,
  })
  @JoinColumn({
    name: 'language_id',
    referencedColumnName: 'id',
  })
  language: Language;

  @Column({
    comment: METADATA.pages.title,
    name: 'pages',
    type: 'int',
    nullable: CONSTRAINTS.pages.nullable,
  })
  pages: number;

  @ManyToMany(() => Tag, {
    cascade: ['insert'],
    nullable: CONSTRAINTS.tags.nullable,
  })
  @JoinTable({
    name: 'books_tags',
    joinColumn: {
      name: 'book_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'tag_id',
      referencedColumnName: 'id',
    },
  })
  tags: Tag[];

  @Column({
    comment: METADATA.details.title,
    name: 'details',
    type: 'jsonb',
    nullable: CONSTRAINTS.details.nullable,
  })
  details: Record<string, unknown>;

  @OneToMany(() => Copy, (copy) => copy.book, {
    nullable: CONSTRAINTS.copies.nullable,
  })
  copies?: Copy[];

  @OneToMany(() => Rating, (rating) => rating.book, {
    nullable: CONSTRAINTS.ratings.nullable,
  })
  ratings?: Rating[];

  @CreateDateColumn({
    comment: METADATA.createdAt.title,
    name: 'created_at',
    nullable: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    comment: METADATA.modifiedAt.title,
    name: 'modified_at',
    nullable: true,
  })
  modifiedAt?: Date;
}
