import { Author as Entity } from '@/modules/books/entities/author.entity';
import { CONSTRAINTS, METADATA } from '@/modules/books/entities/author.props';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateOrUpdateAuthor {
  @IsNumber()
  @ApiPropertyOptional({
    example: 1,
    title: METADATA.id.title,
  })
  id?: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(CONSTRAINTS.firstName.maxLength)
  @ApiProperty({
    example: 'Aleksander',
    title: METADATA.firstName.title,
    maxLength: CONSTRAINTS.firstName.maxLength,
    nullable: CONSTRAINTS.firstName.nullable,
  })
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(CONSTRAINTS.lastName.maxLength)
  @ApiProperty({
    example: 'Kamiński',
    title: METADATA.lastName.title,
    maxLength: CONSTRAINTS.lastName.maxLength,
    nullable: CONSTRAINTS.lastName.nullable,
  })
  lastName: string;

  toEntity(): Entity {
    const author = new Entity();
    author.id = this.id;
    author.firstName = this.firstName;
    author.lastName = this.lastName;

    return author;
  }
}
