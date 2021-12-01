import { METADATA } from '@/modules/books/entities/language.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class LanguagesFilter {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example: 'polski',
    title: METADATA.value.title,
  })
  value?: string;
}
