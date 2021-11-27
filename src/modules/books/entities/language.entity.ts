import { Book } from '@/modules/books/entities/book.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'languages',
  orderBy: {
    id: 'ASC',
  },
})
export class Language {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    comment: 'Wartość',
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
