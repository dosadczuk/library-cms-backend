import { TagViewModel } from '@/modules/books/vms';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from '@/shared/utils/class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

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
