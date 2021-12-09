import { TypeNumber } from '@/shared/decorators/class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from '@/shared/decorators/class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUpdatePublisherBodyDto {
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
  @MaxLength(250)
  @ApiProperty({
    title: 'Nazwa',
    maxLength: 250,
    nullable: false,
  })
  readonly name: string;
}
