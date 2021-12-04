import { CreateUpdateTagResultDto } from '@/modules/books/dto/create-update-tag.dto';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class FindTagsFilterDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @MaxLength(50)
  @ApiPropertyOptional({
    title: 'Wartość',
    maxLength: 50,
  })
  value?: string;
}

class TagResultDto extends PartialType(CreateUpdateTagResultDto) {}

export class FindTagsResultDto {
  @ApiProperty({
    title: 'Znalezione tagi',
    type: [TagResultDto],
  })
  tags: TagResultDto[];
}
