import { METADATA } from '@/modules/books/entities/publisher.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class PublishersFilter {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional({
    example: 'Wydawnictwo',
    title: METADATA.name.title,
  })
  name?: string;
}
