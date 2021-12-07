import { TypeNumber } from '@/shared/decorators/class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from '@/shared/decorators/class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUpdateLanguageBodyDto {
  @IsInt()
  @IsOptional()
  @TypeNumber()
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
  readonly value: string;
}
