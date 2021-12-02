import { METADATA } from '@/modules/books/entities/genre.props';
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
