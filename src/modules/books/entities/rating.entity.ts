import { Book } from '@/modules/books/entities/book.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export const METADATA = {
  id: { title: 'Identyfikator rekordu' },
  value: { title: 'Wartość' },
  comment: { title: 'Komentarz' },
  createdAt: { title: 'Moment utworzenia rekordu' },
  modifiedAt: { title: 'Moment modyfikacji rekordu' },
};

export const CONSTRAINTS = {
  value: { nullable: false },
  comment: { nullable: false },
};

@Entity({
  name: 'ratings',
  orderBy: { id: 'ASC' },
})
export class Rating {
  @PrimaryGeneratedColumn({
    comment: METADATA.id.title,
    name: 'id',
  })
  id: number;

  @Column({
    comment: METADATA.value.title,
    name: 'value',
    type: 'int',
    nullable: CONSTRAINTS.value.nullable,
  })
  value: number;

  @Column({
    comment: METADATA.comment.title,
    name: 'comment',
    type: 'text',
    nullable: CONSTRAINTS.comment.nullable,
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
    comment: METADATA.createdAt.title,
    name: 'created_at',
    nullable: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    comment: METADATA.modifiedAt.title,
    name: 'modified_at',
    nullable: false,
  })
  modifiedAt: Date;
}
