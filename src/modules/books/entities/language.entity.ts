import { CONSTRAINTS, METADATA } from '@/modules/books/entities/language.props';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
