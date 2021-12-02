import { METADATA } from '@/modules/books/entities/language.props';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class LanguagesFilter {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    title: METADATA.value.title,
  })
  value?: string;
}
