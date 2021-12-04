import { Tag } from '@/modules/books/entities/tag.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateUpdateTagDto {
  @IsInt()
  @IsOptional()
  @ApiPropertyOptional({
    title: 'Identyfikator',
    example: 1,
  })
  id?: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @ApiProperty({
    title: 'Wartość',
    example: 'XX wiek',
    maxLength: 100,
    nullable: false,
  })
  value: string;
}

export class CreateUpdateTagResultDto {
  @ApiProperty({
    title: 'Identyfikator',
    example: 1,
  })
  readonly id: number;

  @ApiProperty({
    title: 'Wartość',
    example: 'XX wiek',
  })
  readonly value: string;

  constructor(tag: Tag) {
    this.id = tag.id;
    this.value = tag.value;
  }
}
