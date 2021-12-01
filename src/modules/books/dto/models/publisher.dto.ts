import {
  CONSTRAINTS,
  METADATA,
} from '@/modules/books/entities/publisher.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class Publisher {
  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({
    example: 1,
    title: METADATA.id.title,
  })
  id?: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(CONSTRAINTS.name.maxLength)
  @ApiProperty({
    example: 'Tajfuny',
    title: METADATA.name.title,
    maxLength: CONSTRAINTS.name.maxLength,
    nullable: CONSTRAINTS.name.nullable,
  })
  name: string;
}
