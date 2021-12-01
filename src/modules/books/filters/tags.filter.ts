import { METADATA } from '@/modules/books/entities/tag.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class TagsFilter {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example: 'XX wiek',
    title: METADATA.value.title,
  })
  value?: string;
}
