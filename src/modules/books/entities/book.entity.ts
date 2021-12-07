import { Author } from '@/modules/books/entities/author.entity';
import { Copy } from '@/modules/books/entities/copy.entity';
import { BookType } from '@/modules/books/entities/enums/book-type.enum';
import { Genre } from '@/modules/books/entities/genre.entity';
import { Language } from '@/modules/books/entities/language.entity';
import { Publisher } from '@/modules/books/entities/publisher.entity';
import { Rating } from '@/modules/books/entities/rating.entity';
import { Tag } from '@/modules/books/entities/tag.entity';
import { File } from '@/modules/files/entities/file.entity';
import { Exclude } from 'class-transformer';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'books',
  orderBy: { id: 'ASC' },
})
export class Book extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    comment: 'Identyfikator rekordu',
  })
  id: number;

  @Column({
    name: 'isbn',
    comment: 'ISBN',
    type: 'varchar',
    unique: true,
    length: 13,
    nullable: false,
  })
  isbn: string;

  @Column({
    name: 'type',
    comment: 'Rodzaj',
    type: 'enum',
    enum: BookType,
    nullable: false,
  })
  type: BookType;

  @Column({
    name: 'title',
    comment: 'Tytuł',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  title: string;

  @Column({
    name: 'description',
    comment: 'Opis',
    type: 'text',
    nullable: true,
  })
  description?: string;

  @Column({
    name: 'issue_date',
    comment: 'Data wydania',
    type: 'date',
    nullable: false,
  })
  issueDate: Date;

  @ManyToOne(() => Publisher, {
    eager: true,
    cascade: ['insert'],
    nullable: false,
  })
  @JoinColumn({
    name: 'publisher_id',
    referencedColumnName: 'id',
  })
  publisher: Publisher;

  @ManyToMany(() => Author, {
    eager: true,
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

  @ManyToOne(() => Genre, {
    eager: true,
    cascade: ['insert'],
    nullable: false,
  })
  @JoinColumn({
    name: 'genre_id',
    referencedColumnName: 'id',
  })
  genre: Genre;

  @ManyToOne(() => Language, {
    eager: true,
    cascade: ['insert'],
    nullable: false,
  })
  @JoinColumn({
    name: 'language_id',
    referencedColumnName: 'id',
  })
  language: Language;

  @Column({
    name: 'pages',
    comment: 'Liczba stron',
    type: 'int',
    nullable: false,
  })
  pages: number;

  @OneToOne(() => File, {
    eager: true,
    cascade: false,
  })
  @JoinColumn({
    name: 'image_id',
    referencedColumnName: 'id',
  })
  image?: File;

  @Column({
    name: 'details',
    comment: 'Szczegóły',
    type: 'jsonb',
    nullable: false,
  })
  details: Record<string, unknown>;

  @ManyToMany(() => Tag, {
    eager: true,
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

  @OneToMany(() => Copy, (copy) => copy.book, {
    nullable: true,
  })
  copies?: Copy[];

  @OneToMany(() => Rating, (rating) => rating.book, {
    nullable: true,
  })
  ratings?: Rating[];

  @CreateDateColumn({
    name: 'created_at',
    comment: 'Moment utworzenia rekordu',
    nullable: false,
  })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({
    name: 'modified_at',
    comment: 'Moment modyfikacji rekordu',
    nullable: true,
  })
  modifiedAt?: Date;

  @Exclude()
  @DeleteDateColumn({
    name: 'removed_at',
    comment: 'Moment usunięcia rekordu',
    nullable: true,
  })
  removedAt?: Date;
}
