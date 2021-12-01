import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export const METADATA = {
  id: { title: 'Identyfikator rekordu' },
  name: { title: 'Nazwa' },
  createdAt: { title: 'Moment utworzenia rekordu' },
  modifiedAt: { title: 'Moment modyfikacji rekordu' },
};

export const CONSTRAINTS = {
  name: {
    maxLength: 250,
    nullable: false,
  },
};

@Entity({
  name: 'publishers',
  orderBy: { id: 'ASC' },
})
export class Publisher {
  @PrimaryGeneratedColumn({
    comment: METADATA.id.title,
    name: 'id',
  })
  id: number;

  @Column({
    comment: METADATA.name.title,
    name: 'name',
    type: 'varchar',
    unique: true,
    length: CONSTRAINTS.name.maxLength,
    nullable: CONSTRAINTS.name.nullable,
  })
  name: string;

  @CreateDateColumn({
    comment: METADATA.createdAt.title,
    name: 'created_at',
    nullable: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    comment: METADATA.modifiedAt.title,
    name: 'modified_at',
    nullable: true,
  })
  modifiedAt?: Date;
}
