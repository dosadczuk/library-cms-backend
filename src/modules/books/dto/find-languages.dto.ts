import { LanguageViewModel } from '@/modules/books/vms';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from '@/shared/utils/class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

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
