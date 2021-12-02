import { Tag as Entity } from '@/modules/books/entities/tag.entity';
import { CONSTRAINTS, METADATA } from '@/modules/books/entities/tag.props';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateOrUpdateTag {
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
    example: 'XX wiek',
    title: METADATA.value.title,
    maxLength: CONSTRAINTS.value.maxLength,
    nullable: CONSTRAINTS.value.nullable,
  })
  value: string;

  toEntity(): Entity {
    const tag = new Entity();
    tag.id = this.id;
    tag.value = this.value;

    return tag;
  }
}
