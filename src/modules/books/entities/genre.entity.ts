import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
