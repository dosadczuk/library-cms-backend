import { CONSTRAINTS, METADATA } from '@/modules/books/entities/borrow.props';
import { Copy } from '@/modules/books/entities/copy.entity';
import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'borrows',
  orderBy: { id: 'ASC' },
})
export class Borrow {
  @PrimaryGeneratedColumn({
    comment: METADATA.id.title,
    name: 'id',
  })
  id: number;

  @Column({
    comment: METADATA.dateFrom.title,
    name: 'date_from',
    type: 'date',
    nullable: CONSTRAINTS.dateFrom.nullable,
  })
  dateFrom: Date;

  @Column({
    comment: METADATA.dateTo.title,
    name: 'date_to',
    type: 'date',
    nullable: CONSTRAINTS.dateTo.nullable,
  })
  dateTo?: Date;

  @ManyToOne(() => Copy, (copy) => copy.borrows, {
    nullable: false,
  })
  @JoinColumn({
    name: 'copy_id',
    referencedColumnName: 'id',
  })
  copy: Copy;

  @CreateDateColumn({
    comment: METADATA.createdAt.title,
    name: 'created_at',
    nullable: false,
  })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({
    comment: METADATA.modifiedAt.title,
    name: 'modified_at',
    nullable: true,
  })
  modifiedAt?: Date;
}
