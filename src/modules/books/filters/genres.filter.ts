import { METADATA } from '@/modules/books/entities/metadata/genre.metadata';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class GenresFilter {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    title: METADATA.value.title,
  })
  value?: string;
}
