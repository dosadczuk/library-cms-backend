import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'tags',
  orderBy: { id: 'ASC' },
})
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    comment: 'Identyfikator tagu',
  })
  id: number;

  @Column({
    comment: 'Wartość',
    name: 'value',
    type: 'varchar',
    unique: true,
    length: 100,
    nullable: false,
  })
  value: string;
}
