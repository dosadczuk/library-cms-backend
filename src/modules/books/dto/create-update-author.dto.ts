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
