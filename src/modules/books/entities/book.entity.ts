import { Author } from '@/modules/books/entities/author.entity';
import { Copy } from '@/modules/books/entities/copy.entity';
import { Genre } from '@/modules/books/entities/genre.entity';
import { Language } from '@/modules/books/entities/language.entity';
import { Publisher } from '@/modules/books/entities/publisher.entity';
import { Rating } from '@/modules/books/entities/rating.entity';
import { Tag } from '@/modules/books/entities/tag.entity';
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

export enum BookType {
  BOOK = 'book',
  MAGAZINE = 'magazine',
  ARTICLE = 'article',
  THESIS = 'thesis',
}

@Entity({
  name: 'books',
  orderBy: {
    id: 'ASC',
  },
})
export class Book {
  @PrimaryGeneratedColumn({
    comment: 'Identyfikator rekordu',
    name: 'id',
  })
  id: number;

  @Column({
    comment: 'ISBN',
    name: 'isbn',
    type: 'varchar',
    length: 13,
    unique: true,
    nullable: false,
  })
  isbn: string;

  @Column({
    comment: 'Tytuł',
    name: 'title',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  title: string;

  @Column({
    comment: 'Data wydania',
    name: 'issue_date',
    type: 'date',
    nullable: false,
  })
  issueDate: Date;

  @ManyToOne(() => Publisher, (publisher) => publisher.books, {
    cascade: ['insert'],
    nullable: false,
  })
  @JoinColumn({
    name: 'publisher_id',
    referencedColumnName: 'id',
  })
  publisher: Publisher;

  @ManyToMany(() => Author, {
    cascade: ['insert'],
    nullable: false,
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
    comment: 'Rodzaj',
    name: 'type',
    type: 'enum',
    enum: BookType,
  })
  type: BookType;

  @ManyToOne(() => Genre, (genre) => genre.books, {
    cascade: ['insert'],
    nullable: false,
  })
  @JoinColumn({
    name: 'genre_id',
    referencedColumnName: 'id',
  })
  genre: Genre;

  @ManyToOne(() => Language, (language) => language.books, {
    cascade: ['insert'],
    nullable: false,
  })
  @JoinColumn({
    name: 'language_id',
    referencedColumnName: 'id',
  })
  language: Language;

  @Column({
    comment: 'Liczba stron',
    name: 'pages',
    type: 'int',
    nullable: false,
  })
  pages: number;

  @ManyToMany(() => Tag, {
    cascade: ['insert'],
    nullable: false,
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
    comment: 'Szczegółowe informacje',
    name: 'details',
    type: 'jsonb',
    nullable: false,
  })
  details: Record<string, unknown>;

  @OneToMany(() => Copy, (copy) => copy.book, {
    nullable: true,
  })
  copies?: Copy[];

  @OneToMany(() => Rating, (rating) => rating.book, {
    nullable: true,
  })
  ratings?: Rating[];

  @CreateDateColumn({
    comment: 'Moment utworzenia rekordu',
    name: 'created_at',
    nullable: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    comment: 'Moment modyfikacji rekordu',
    name: 'modified_at',
    nullable: true,
  })
  modifiedAt?: Date;
}
