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

@Entity({
  name: 'borrows',
  orderBy: {
    id: 'ASC',
  },
})
export class Borrow {
  @PrimaryGeneratedColumn({
    comment: 'Identyfikator rekordu',
    name: 'id',
  })
  id: number;

  @Column({
    comment: 'Data od',
    name: 'date_from',
    type: 'date',
    nullable: false,
  })
  dateFrom: Date;

  @Column({
    comment: 'Data do',
    name: 'date_to',
    type: 'date',
    nullable: true,
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
    comment: 'Moment utworzenia rekordu',
    name: 'created_at',
    nullable: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    comment: 'Moment modyfikacji rekordu',
    name: 'modified_at',
    nullable: true,
  })
  modifiedAt?: Date;
}
