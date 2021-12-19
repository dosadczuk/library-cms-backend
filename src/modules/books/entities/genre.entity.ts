import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'genres',
  orderBy: { id: 'ASC' },
})
export class Genre extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    comment: 'Identyfikator gatunku',
  })
  id: number;

  @Column({
    name: 'value',
    comment: 'Wartość',
    type: 'varchar',
    unique: true,
    length: 100,
    nullable: false,
  })
  value: string;
}
