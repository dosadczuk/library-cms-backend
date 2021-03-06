import { PublisherViewModel } from '@/modules/books/vms';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from '@/shared/utils/class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class FindPublishersFilterDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @MaxLength(250)
  @ApiPropertyOptional({
    description: 'Nazwa',
    maxLength: 250,
  })
  readonly name?: string;
}

export class FindPublishersResultDto {
  @ApiProperty({
    title: 'Znalezieni wydawcy',
    type: [PublisherViewModel],
  })
  readonly publishers: PublisherViewModel[];

  constructor(publishers: PublisherViewModel[]) {
    this.publishers = publishers;
  }
}
