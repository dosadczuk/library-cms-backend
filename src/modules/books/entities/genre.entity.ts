import { Book } from '@/modules/books/entities/book.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'genres',
  orderBy: {
    id: 'ASC',
  },
})
export class Genre {
  @PrimaryGeneratedColumn({
    comment: 'Identyfikator rekordu',
    name: 'id',
  })
  id: number;

  @Column({
    comment: 'Wartość',
    name: 'value',
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  value: string;

  @OneToMany(() => Book, (book) => book.genre, {
    nullable: true,
  })
  books?: Book[];
}
