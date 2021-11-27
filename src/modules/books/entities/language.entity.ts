import { Book } from '@/modules/books/entities/book.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'languages',
  orderBy: {
    id: 'ASC',
  },
})
export class Language {
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

  @OneToMany(() => Book, (book) => book.language, {
    nullable: true,
  })
  books?: Book[];
}
