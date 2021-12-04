import { Genre } from '@/modules/books/entities/genre.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateUpdateGenreDto {
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
  @MaxLength(100)
  @ApiProperty({
    title: 'Wartość',
    example: 'komedia',
    maxLength: 100,
    nullable: false,
  })
  value: string;
}

export class CreateUpdateGenreResultDto {
  @ApiProperty({
    title: 'Identyfikator',
    example: 1,
  })
  readonly id: number;

  @ApiProperty({
    title: 'Wartość',
    example: 'komedia',
  })
  readonly value: string;

  constructor(genre: Genre) {
    this.id = genre.id;
    this.value = genre.value;
  }
}
