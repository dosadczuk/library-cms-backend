import { Copy } from '@/modules/books/entities/copy.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export const METADATA = {
  id: { title: 'Identyfikator rekordu' },
  dateFrom: { title: 'Data od' },
  dateTo: { title: 'Data do' },
  createdAt: { title: 'Moment utworzenia rekordu' },
  modifiedAt: { title: 'Moment modyfikacji rekordu' },
};

export const CONSTRAINTS = {
  dateFrom: { nullable: false },
  dateTo: { nullable: true },
};

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

  @UpdateDateColumn({
    comment: METADATA.modifiedAt.title,
    name: 'modified_at',
    nullable: true,
  })
  modifiedAt?: Date;
}
