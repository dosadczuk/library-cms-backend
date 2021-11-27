import { Book } from '@/modules/books/entities/book.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
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
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    comment: 'Wartość',
    type: 'int',
    nullable: false,
  })
  value: number;

  @Column({
    comment: 'Komentarz',
    type: 'text',
    nullable: false,
  })
  comment: string;

  @ManyToOne(() => Book, (book) => book.ratings, {
    nullable: false,
  })
  book: Book;

  @CreateDateColumn({
    comment: 'Moment utworzenia rekordu',
    nullable: false,
  })
  createdAt: Date;
}
