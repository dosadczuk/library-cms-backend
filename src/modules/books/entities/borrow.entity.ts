import { Copy } from '@/modules/books/entities/copy.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
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
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    comment: 'Data od',
    type: 'date',
    nullable: false,
  })
  dateFrom: Date;

  @Column({
    comment: 'Data do',
    type: 'date',
    nullable: true,
  })
  dateTo?: Date;

  @ManyToOne(() => Copy, (copy) => copy.borrows, {
    nullable: false,
  })
  copy: Copy;

  @CreateDateColumn({
    comment: 'Moment utworzenia rekordu',
    nullable: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    comment: 'Moment modyfikacji rekordu',
    nullable: true,
  })
  modifiedAt?: Date;
}
