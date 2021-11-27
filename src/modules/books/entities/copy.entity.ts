import { Book } from '@/modules/books/entities/book.entity';
import { Borrow } from '@/modules/books/entities/borrow.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'copies',
  orderBy: {
    id: 'ASC',
  },
})
export class Copy {
  @PrimaryGeneratedColumn({
    comment: 'Identyfikator rekordu',
    name: 'id',
  })
  id: number;

  @Column({
    comment: 'Numer',
    name: 'number',
    type: 'uuid',
    nullable: false,
  })
  number: string;

  @ManyToOne(() => Book, (book) => book.copies, {
    nullable: false,
  })
  @JoinColumn({
    name: 'book_id',
    referencedColumnName: 'id',
  })
  book: Book;

  @OneToMany(() => Borrow, (borrow) => borrow.copy, {
    nullable: true,
  })
  borrows: Borrow[];

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
  modifiedAt: Date;
}
