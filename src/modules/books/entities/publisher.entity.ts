import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'publishers',
  orderBy: { id: 'ASC' },
})
export class Publisher extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    comment: 'Identyfikator wydawcy',
  })
  id: number;

  @Column({
    name: 'name',
    comment: 'Nazwa',
    type: 'varchar',
    unique: true,
    length: 250,
    nullable: false,
  })
  name: string;

  @CreateDateColumn({
    name: 'created_at',
    comment: 'Moment utworzenia rekordu',
    nullable: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'modified_at',
    comment: 'Moment modyfikacji rekordu',
    nullable: true,
  })
  modifiedAt?: Date;
}
