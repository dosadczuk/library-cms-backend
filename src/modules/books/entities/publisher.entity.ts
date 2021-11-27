import { Book } from '@/modules/books/entities/book.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'publishers',
  orderBy: {
    id: 'ASC',
  },
})
export class Publisher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    comment: 'Nazwa',
    type: 'varchar',
    length: 250,
    nullable: false,
  })
  name: string;

  @OneToMany(() => Book, (book) => book.publisher, {
    nullable: true,
  })
  books?: Book[];

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
