import { Book } from '@/modules/books/entities/book.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

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
  name: 'tags',
  orderBy: { id: 'ASC' },
})
export class Tag {
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

  @ManyToMany(() => Book, (book) => book.tags, {
    nullable: true,
  })
  books?: Book[];
}
