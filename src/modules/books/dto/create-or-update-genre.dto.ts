import { CONSTRAINTS } from '@/modules/books/entities/constraints/genre.constraints';
import { Genre as Entity } from '@/modules/books/entities/genre.entity';
import { METADATA } from '@/modules/books/entities/metadata/genre.metadata';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateOrUpdateGenre {
  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({
    example: 1,
    title: METADATA.id.title,
  })
  id?: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(CONSTRAINTS.value.maxLength)
  @ApiProperty({
    example: 'komedia',
    title: METADATA.value.title,
    maxLength: CONSTRAINTS.value.maxLength,
    nullable: CONSTRAINTS.value.nullable,
  })
  value: string;

  toEntity(): Entity {
    const genre = new Entity();
    genre.id = this.id;
    genre.value = this.value;

    return genre;
  }
}
