import { Book } from '@/modules/books/entities/book.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'tags',
  orderBy: {
    id: 'ASC',
  },
})
export class Tag {
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

  @ManyToMany(() => Book, (book) => book.tags, {
    nullable: true,
  })
  books?: Book[];
}
