import { CONSTRAINTS } from '@/modules/books/entities/constraints/genre.constraints';
import { METADATA } from '@/modules/books/entities/metadata/genre.metadata';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'genres',
  orderBy: { id: 'ASC' },
})
export class Genre {
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
}
