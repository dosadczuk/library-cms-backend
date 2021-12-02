import { METADATA } from '@/modules/books/entities/author.props';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class AuthorsFilter {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    title: METADATA.firstName.title,
  })
  firstName?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    title: METADATA.lastName.title,
  })
  lastName?: string;
}
