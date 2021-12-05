import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { GenreViewModel } from '@/modules/books/vms/genre.vm';

export class FindGenresFilterDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @MaxLength(50)
  @ApiPropertyOptional({
    title: 'Wartość',
    example: 'XX wiek',
    maxLength: 50,
  })
  value?: string;
}

export class FindGenresResultDto {
  @ApiProperty({
    title: 'Znalezione gatunki',
    type: [GenreViewModel],
  })
  readonly genres: GenreViewModel[];

  constructor(genres: GenreViewModel[]) {
    this.genres = genres;
  }
}
