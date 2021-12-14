import { User } from '@/modules/users/entities';
import { Role } from '@/modules/users/entities/enums';
import { ApiProperty } from '@nestjs/swagger';

export class UserViewModel {
  @ApiProperty({
    title: 'Identyfikator',
    example: 1,
  })
  readonly id: number;

  @ApiProperty({
    title: 'Imię',
    example: 'Jan',
  })
  readonly firstName: string;

  @ApiProperty({
    title: 'Nazwisko',
    example: 'Kowalski',
  })
  readonly lastName: string;

  @ApiProperty({
    title: 'Adres e-mail',
    example: 'jan.kowalski@example.pl',
  })
  readonly email: string;

  @ApiProperty({
    title: 'Rola',
    example: Role.ADMIN,
  })
  readonly role: string;

  constructor(user: User) {
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.role = user.role;
  }
}
