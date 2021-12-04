import { CreateUpdatePublisherResultDto } from '@/modules/books/dto/create-update-publisher.dto';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
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
  name?: string;
}

class PublisherResultDto extends PartialType(CreateUpdatePublisherResultDto) {}

export class FindPublishersResultDto {
  @ApiProperty({
    title: 'Znalezione wydawcy',
    type: [PublisherResultDto],
  })
  publishers: PublisherResultDto[];
}
