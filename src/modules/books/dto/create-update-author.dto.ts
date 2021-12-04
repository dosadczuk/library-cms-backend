import { Author } from '@/modules/books/entities/author.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateUpdateAuthorDto {
  @IsInt()
  @IsOptional()
  @ApiPropertyOptional({
    title: 'Identyfikator',
    example: 1,
    nullable: true,
  })
  id?: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @ApiProperty({
    title: 'Imię',
    example: 'Jan',
    maxLength: 50,
    nullable: false,
  })
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @ApiProperty({
    title: 'Nazwisko',
    example: 'Kowalski',
    maxLength: 50,
    nullable: false,
  })
  lastName: string;
}

export class CreateUpdateAuthorResultDto {
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

  constructor(author: Author) {
    this.id = author.id;
    this.firstName = author.firstName;
    this.lastName = author.lastName;
  }
}
