import { CreateUpdateLanguageResultDto } from '@/modules/books/dto/create-update-language.dto';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
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
  value?: string;
}

class LanguageResultDto extends PartialType(CreateUpdateLanguageResultDto) {}

export class FindLanguagesResultDto {
  @ApiProperty({
    title: 'Znalezione języki',
    type: [LanguageResultDto],
  })
  languages: LanguageResultDto[];
}
