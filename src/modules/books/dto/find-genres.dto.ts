import { GenreViewModel } from '@/modules/books/vms';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from '@/shared/utils/class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

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
  readonly value?: string;
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
