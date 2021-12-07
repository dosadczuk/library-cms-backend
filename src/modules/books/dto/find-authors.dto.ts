import { AuthorViewModel } from '@/modules/books/vms/author.vm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class FindAuthorsFilterDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional({
    title: 'Imię',
    example: 'Jan',
  })
  readonly firstName?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional({
    title: 'Nazwisko',
    example: 'Kowalski',
  })
  readonly lastName?: string;
}

export class FindAuthorsResultDto {
  @ApiProperty({
    title: 'Znalezieni autorzy',
    type: [AuthorViewModel],
  })
  readonly authors: AuthorViewModel[];

  constructor(authors: AuthorViewModel[]) {
    this.authors = authors;
  }
}
