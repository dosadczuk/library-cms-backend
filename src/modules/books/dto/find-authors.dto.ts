import { AuthorViewModel } from '@/modules/books/vms/author.vm';
import { IsNotEmpty, IsOptional, IsString } from '@/shared/decorators/class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

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
