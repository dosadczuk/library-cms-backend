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

export const METADATA = {
  id: { title: 'Identyfikator rekordu' },
  number: { title: 'Numer' },
  createdAt: { title: 'Moment utworzenia rekordu' },
  modifiedAt: { title: 'Moment modyfikacji rekordu' },
};

export const CONSTRAINTS = {
  number: { nullable: false },
};

@Entity({
  name: 'copies',
  orderBy: { id: 'ASC' },
})
export class Copy {
  @PrimaryGeneratedColumn({
    comment: METADATA.id.title,
    name: 'id',
  })
  id: number;

  @Column({
    comment: METADATA.number.title,
    name: 'number',
    type: 'uuid',
    unique: true,
    nullable: CONSTRAINTS.number.nullable,
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
  modifiedAt: Date;
}
