import { METADATA } from '@/modules/books/entities/author.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class AuthorsFilter {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example: 'Adam',
    title: METADATA.firstName.title,
  })
  firstName?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example: 'Nowak',
    title: METADATA.lastName.title,
  })
  lastName?: string;
}
