import { CONSTRAINTS, METADATA } from '@/modules/books/entities/author.props';
import { Expose } from 'class-transformer';
import {
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
export class Author {
  @PrimaryGeneratedColumn({
    comment: METADATA.id.title,
    name: 'id',
  })
  id: number;

  @Column({
    comment: METADATA.firstName.title,
    name: 'first_name',
    type: 'varchar',
    length: CONSTRAINTS.firstName.maxLength,
    nullable: CONSTRAINTS.firstName.nullable,
  })
  firstName: string;

  @Column({
    comment: METADATA.lastName.title,
    name: 'last_name',
    type: 'varchar',
    length: CONSTRAINTS.lastName.maxLength,
    nullable: CONSTRAINTS.lastName.nullable,
  })
  lastName: string;

  @Expose()
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

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
