import { CONSTRAINTS } from '@/modules/books/entities/constraints/language.constraints';
import { Language as Entity } from '@/modules/books/entities/language.entity';
import { METADATA } from '@/modules/books/entities/metadata/language.metadata';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateOrUpdateLanguage {
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
    example: 'francuski',
    title: METADATA.value.title,
    maxLength: CONSTRAINTS.value.maxLength,
    nullable: CONSTRAINTS.value.nullable,
  })
  value: string;

  toEntity(): Entity {
    const language = new Entity();
    language.id = this.id;
    language.value = this.value;

    return language;
  }
}
