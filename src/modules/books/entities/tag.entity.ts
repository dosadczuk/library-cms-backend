import { CONSTRAINTS } from '@/modules/books/entities/constraints/tag.constraints';
import { METADATA } from '@/modules/books/entities/metadata/tag.metadata';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
