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
    comment: 'Identyfikator rekordu',
  })
  id: number;

  @Column({
    name: 'value',
    comment: 'Wartość',
    type: 'int',
    nullable: false,
  })
  value: number;

  @Column({
    name: 'comment',
    comment: 'Komentarz',
    type: 'text',
    nullable: false,
  })
  comment: string;

  @ManyToOne(() => Book, (book) => book.ratings, {
    nullable: false,
  })
  @JoinColumn({
    name: 'book_id',
    referencedColumnName: 'id',
  })
  book: Book;

  @CreateDateColumn({
    name: 'created_at',
    comment: 'Moment utworzenia rekordu',
    nullable: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'modified_at',
    comment: 'Moment modyfikacji rekordu',
    nullable: false,
  })
  modifiedAt: Date;
}
