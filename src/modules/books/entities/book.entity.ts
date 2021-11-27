import { Author } from '@/modules/books/entities/author.entity';
import { Copy } from '@/modules/books/entities/copy.entity';
import { Genre } from '@/modules/books/entities/genre.entity';
import { Language } from '@/modules/books/entities/language.entity';
import { Publisher } from '@/modules/books/entities/publisher.entity';
import { Rating } from '@/modules/books/entities/rating.entity';
import { Tag } from '@/modules/books/entities/tag.entity';
import { Type } from '@/modules/books/entities/type.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'books',
  orderBy: {
    id: 'ASC',
  },
})
export class Book {
  @PrimaryGeneratedColumn({
    comment: 'Identyfikator rekordu',
  })
  id: number;

  @Column({
    comment: 'ISBN',
    type: 'varchar',
    length: 13,
    unique: true,
    nullable: false,
  })
  isbn: string;

  @Column({
    comment: 'Tytuł',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  title: string;

  @Column({
    comment: 'Data wydania',
    type: 'date',
    nullable: false,
  })
  issueDate: Date;

  @ManyToOne(() => Publisher, (publisher) => publisher.books, {
    nullable: false,
  })
  publisher: Publisher;

  @ManyToMany(() => Author, {
    nullable: false,
  })
  @JoinTable({ name: 'books_authors' })
  authors: Author[];

  @ManyToOne(() => Type, (type) => type.books, {
    nullable: false,
  })
  type: Type;

  @ManyToOne(() => Genre, (genre) => genre.books, {
    nullable: false,
  })
  genre: Genre;

  @ManyToOne(() => Language, (language) => language.books, {
    nullable: false,
  })
  language: Language;

  @Column({
    comment: 'Liczba stron',
    type: 'int',
    nullable: false,
  })
  pagesCount: number;

  @ManyToMany(() => Tag, {
    nullable: false,
  })
  @JoinTable({ name: 'books_tags' })
  tags: Tag[];

  @Column({
    comment: 'Szczegółowe informacje',
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
    nullable: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    comment: 'Moment modyfikacji rekordu',
    nullable: true,
  })
  modifiedAt: Date;
}
