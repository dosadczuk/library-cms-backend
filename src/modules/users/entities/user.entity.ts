import { Borrow } from '@/modules/books/entities';
import { Role } from '@/modules/users/entities/enums';
import { genSaltSync, hashSync } from 'bcryptjs';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'users',
  orderBy: { id: 'ASC' },
})
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    comment: 'Identyfikator użytkownika',
  })
  id: number;

  @Column({
    name: 'first_name',
    comment: 'Imie',
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

  @Column({
    name: 'email',
    comment: 'E-mail',
    type: 'varchar',
    length: 255,
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    name: 'password',
    comment: 'Hasło',
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  password: string;

  @Column({
    name: 'role',
    comment: 'Rola',
    type: 'enum',
    enum: Role,
    nullable: false,
  })
  role: Role;

  @Column({
    name: 'is_active',
    comment: 'Czy aktywny',
    type: 'boolean',
    nullable: false,
    default: false,
  })
  isActive: boolean;

  @Column({
    name: 'last_logged_at',
    comment: 'Moment ostatniego logowania',
    type: 'timestamp',
    nullable: true,
  })
  lastLoggedAt?: Date;

  @OneToMany(() => Borrow, (borrow) => borrow.user, {
    nullable: true,
  })
  borrows: Borrow[];

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

  @DeleteDateColumn({
    name: 'removed_at',
    comment: 'Moment usunięcia rekordu',
    type: 'timestamp',
    nullable: true,
  })
  removedAt?: Date;

  @BeforeInsert()
  setPassword(password?: string) {
    this.password = hashSync(password ?? this.password, genSaltSync());
  }
}
