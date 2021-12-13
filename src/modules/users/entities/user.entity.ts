import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './enums/role.enum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({
    name: 'id',
    comment: 'Identyfikator rekordu',
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
    nullable: false,
    unique: true,
  })
  email: string;
  @Column({
    name: 'password',
    comment: 'Hasło',
    type: 'varchar',
    length: 32,
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
}
