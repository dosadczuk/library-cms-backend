import { METADATA } from '@/modules/books/entities/tag.props';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class TagsFilter {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    title: METADATA.value.title,
  })
  value?: string;
}
