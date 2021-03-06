import { TypeNumber } from '@/shared/utils/class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from '@/shared/utils/class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUpdateGenreBodyDto {
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
    example: 'komedia',
    maxLength: 100,
    nullable: false,
  })
  readonly value: string;
}
