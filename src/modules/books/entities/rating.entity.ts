import { Book } from '@/modules/books/entities/book.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'ratings',
  orderBy: {
    id: 'ASC',
  },
})
export class Rating {
  @PrimaryGeneratedColumn({
    comment: 'Identyfikator rekordu',
    name: 'id',
  })
  id: number;

  @Column({
    comment: 'Wartość',
    name: 'value',
    type: 'int',
    nullable: false,
  })
  value: number;

  @Column({
    comment: 'Komentarz',
    name: 'comment',
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
    comment: 'Moment utworzenia rekordu',
    name: 'created_at',
    nullable: false,
  })
  createdAt: Date;
}
