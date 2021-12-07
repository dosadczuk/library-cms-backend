import { TagViewModel } from '@/modules/books/vms/tag.vm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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
  readonly value?: string;
}

export class FindTagsResultDto {
  @ApiProperty({
    title: 'Znalezione tagi',
    type: [TagViewModel],
  })
  readonly tags: TagViewModel[];

  constructor(tags: TagViewModel[]) {
    this.tags = tags;
  }
}
