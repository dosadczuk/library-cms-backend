import { Book } from '@/modules/books/entities/book.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export const METADATA = {
  id: { title: 'Identyfikator rekordu' },
  value: { title: 'Wartość' },
};

export const CONSTRAINTS = {
  value: {
    maxLength: 100,
    nullable: false,
  },
};

@Entity({
  name: 'languages',
  orderBy: { id: 'ASC' },
})
export class Language {
  @PrimaryGeneratedColumn({
    comment: METADATA.id.title,
    name: 'id',
  })
  id: number;

  @Column({
    comment: METADATA.value.title,
    name: 'value',
    type: 'varchar',
    unique: true,
    length: CONSTRAINTS.value.maxLength,
    nullable: CONSTRAINTS.value.nullable,
  })
  value: string;

  @OneToMany(() => Book, (book) => book.language, {
    nullable: true,
  })
  books?: Book[];
}
