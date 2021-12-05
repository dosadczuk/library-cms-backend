import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateUpdatePublisherDto {
  @IsInt()
  @IsOptional()
  @ApiPropertyOptional({
    title: 'Identyfikator',
    example: 1,
  })
  id?: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(250)
  @ApiProperty({
    title: 'Nazwa',
    maxLength: 250,
    nullable: false,
  })
  name: string;
}
