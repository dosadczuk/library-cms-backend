import { Book } from '@/modules/books/entities/book.entity';
import { Borrow } from '@/modules/books/entities/borrow.entity';
import { CONSTRAINTS } from '@/modules/books/entities/constraints/copy.constraints';
import { METADATA } from '@/modules/books/entities/metadata/copy.metadata';
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
    type: 'varchar',
    unique: true,
    length: CONSTRAINTS.number.maxLength,
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
