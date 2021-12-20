import { Copy } from '@/modules/books/entities/copy.entity';
import { User } from '@/modules/users/entities';
import {
  BaseEntity,
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
export class Borrow extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    comment: 'Identyfikator wypożyczenia',
  })
  id: number;

  @Column({
    name: 'date_from',
    comment: 'Data od',
    type: 'date',
    nullable: false,
  })
  dateFrom: Date;

  @Column({
    name: 'date_to',
    comment: 'Data do',
    type: 'date',
    nullable: true,
  })
  dateTo?: Date;

  @ManyToOne(() => Copy, (copy) => copy.borrows, {
    lazy: true,
    cascade: false,
    nullable: false,
  })
  @JoinColumn({
    name: 'copy_id',
    referencedColumnName: 'id',
  })
  copy: Copy;

  @Column({
    name: 'copy_id',
    update: false,
  })
  copyId: number;

  @ManyToOne(() => User, (user) => user.borrows, {
    eager: true,
    cascade: false,
    nullable: false,
  })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  user: User;

  @Column({
    name: 'user_id',
    update: false,
  })
  userId: number;

  @CreateDateColumn({
    name: 'created_at',
    comment: 'Moment utworzenia rekordu',
    type: 'timestamp',
    nullable: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'modified_at',
    comment: 'Moment modyfikacji rekordu',
    type: 'timestamp',
    nullable: true,
  })
  modifiedAt?: Date;
}
