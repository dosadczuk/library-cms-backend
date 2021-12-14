import { Author } from '@/modules/books/entities';
import { ApiProperty } from '@nestjs/swagger';

export class AuthorViewModel {
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
    example: 'Nowak',
  })
  readonly lastName: string;

  constructor(author: Author) {
    this.id = author.id;
    this.firstName = author.firstName;
    this.lastName = author.lastName;
  }
}
