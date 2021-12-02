import { Genre as Entity } from '@/modules/books/entities/genre.entity';
import { CONSTRAINTS, METADATA } from '@/modules/books/entities/genre.props';
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
