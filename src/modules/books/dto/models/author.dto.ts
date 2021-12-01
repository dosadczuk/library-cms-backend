import { CONSTRAINTS, METADATA } from '@/modules/books/entities/author.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class Author {
  @IsNumber()
  @IsOptional()
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
}
