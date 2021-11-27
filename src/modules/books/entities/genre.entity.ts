import { Book } from '@/modules/books/entities/book.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'genres',
  orderBy: {
    id: 'ASC',
  },
})
export class Genre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    comment: 'Wartość',
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
