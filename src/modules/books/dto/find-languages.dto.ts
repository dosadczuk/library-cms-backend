import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { LanguageViewModel } from '@/modules/books/vms/language.vm';

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
  value?: string;
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
