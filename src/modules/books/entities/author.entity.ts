import { Exclude, Expose } from 'class-transformer';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'authors',
  orderBy: { id: 'ASC' },
})
export class Author extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    comment: 'Identyfikator rekordu',
  })
  id: number;

  @Column({
    name: 'first_name',
    comment: 'Imię',
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  firstName: string;

  @Column({
    name: 'last_name',
    comment: 'Nazwisko',
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  lastName: string;

  @Expose()
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  @CreateDateColumn({
    name: 'created_at',
    comment: 'Moment utworzenia rekordu',
    nullable: false,
  })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({
    name: 'modified_at',
    comment: 'Moment modyfikacji rekordu',
    nullable: true,
  })
  modifiedAt?: Date;
}
