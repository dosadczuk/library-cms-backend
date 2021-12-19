import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'languages',
  orderBy: { id: 'ASC' },
})
export class Language extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    comment: 'Identyfikator języka',
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
