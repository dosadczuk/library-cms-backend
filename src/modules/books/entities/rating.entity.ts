import { Book } from '@/modules/books/entities/book.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'ratings',
  orderBy: { id: 'ASC' },
})
export class Rating extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    comment: 'Identyfikator oceny',
  })
  id: number;

  @Column({
    name: 'value',
    comment: 'Wartość',
    type: 'decimal',
    precision: 2,
    scale: 1,
    nullable: false,
  })
  value: number;

  @Column({
    name: 'comment',
    comment: 'Komentarz',
    type: 'text',
    nullable: true,
  })
  comment?: string;

  @ManyToOne(() => Book, (book) => book.ratings, {
    nullable: false,
  })
  @JoinColumn({
    name: 'book_id',
    referencedColumnName: 'id',
  })
  book: Book;

  @Column({
    name: 'book_id',
    update: false,
  })
  bookId: number;

  @CreateDateColumn({
    name: 'created_at',
    comment: 'Moment utworzenia rekordu',
    type: 'timestamp',
    nullable: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'modified_at',
    comment: 'Moment modyfikacji rekordu',
    type: 'timestamp',
    nullable: false,
  })
  modifiedAt: Date;
}
