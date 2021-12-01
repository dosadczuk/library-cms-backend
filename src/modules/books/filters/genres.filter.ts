import { METADATA } from '@/modules/books/entities/genre.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class GenresFilter {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example: 'komedia',
    title: METADATA.value.title,
  })
  value?: string;
}
