import { Book } from '@/modules/books/entities/book.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'types',
  orderBy: {
    id: 'ASC',
  },
})
export class Type {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    comment: 'Wartość',
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  value: string;

  @OneToMany(() => Book, (book) => book.type, {
    nullable: true,
  })
  books?: Book[];
}
