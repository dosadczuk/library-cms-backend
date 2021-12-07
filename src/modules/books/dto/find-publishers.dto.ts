import { PublisherViewModel } from '@/modules/books/vms/publisher.vm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class FindPublishersFilterDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @MaxLength(250)
  @ApiPropertyOptional({
    title: 'Nazwa',
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
