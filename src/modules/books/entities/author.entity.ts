import { Book } from '@/modules/books/entities/book.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'authors',
  orderBy: {
    id: 'ASC',
  },
})
export class Author {
  @PrimaryGeneratedColumn({
    comment: 'Identyfikator rekordu',
    name: 'id',
  })
  id: number;

  @Column({
    comment: 'Imię',
    name: 'first_name',
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  firstName: string;

  @Column({
    comment: 'Nazwisko',
    name: 'last_name',
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  lastName: string;

  @ManyToMany(() => Book, {
    nullable: true,
  })
  books?: Book[];

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
  modifiedAt?: Date;
}
