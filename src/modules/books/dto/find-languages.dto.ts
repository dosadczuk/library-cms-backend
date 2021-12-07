import { LanguageViewModel } from '@/modules/books/vms/language.vm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class FindLanguagesFilterDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @MaxLength(50)
  @ApiPropertyOptional({
    title: 'Wartość',
    example: 'polski',
    maxLength: 50,
  })
  readonly value?: string;
}

export class FindLanguagesResultDto {
  @ApiProperty({
    title: 'Znalezione języki',
    type: [LanguageViewModel],
  })
  readonly languages: LanguageViewModel[];

  constructor(languages: LanguageViewModel[]) {
    this.languages = languages;
  }
}