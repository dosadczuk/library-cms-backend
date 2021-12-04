import { Language } from '@/modules/books/entities/language.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateUpdateLanguageDto {
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
    example: 'polski',
    maxLength: 100,
    nullable: false,
  })
  value: string;
}

export class CreateUpdateLanguageResultDto {
  @ApiProperty({
    title: 'Identyfikator',
    example: 1,
  })
  readonly id: number;

  @ApiProperty({
    title: 'Wartość',
    example: 'polski',
  })
  readonly value: string;

  constructor(language: Language) {
    this.id = language.id;
    this.value = language.value;
  }
}
