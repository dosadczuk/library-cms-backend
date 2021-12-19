import { Book } from '@/modules/books/entities/book.entity';
import { Borrow } from '@/modules/books/entities/borrow.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'copies',
  orderBy: { id: 'ASC' },
})
@Unique(['number', 'book'])
export class Copy extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    comment: 'Identyfikator egzemplarza',
  })
  id: number;

  @Column({
    name: 'number',
    comment: 'Numer',
    type: 'varchar',
    length: 50,
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

  @Column({
    name: 'book_id',
    update: false,
  })
  bookId: number;

  @OneToMany(() => Borrow, (borrow) => borrow.copy, {
    nullable: true,
  })
  borrows: Borrow[];

  @CreateDateColumn({
    name: 'created_at',
    comment: 'Moment utworzenia rekordu',
    nullable: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'modified_at',
    comment: 'Moment modyfikacji rekordu',
    nullable: true,
  })
  modifiedAt?: Date;

  @DeleteDateColumn({
    name: 'removed_at',
    comment: 'Moment usunięcie rekordu',
    nullable: true,
  })
  removedAt: Date;
}
