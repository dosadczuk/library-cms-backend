import { METADATA } from '@/modules/books/entities/publisher.props';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class PublishersFilter {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    title: METADATA.name.title,
  })
  name?: string;
}
