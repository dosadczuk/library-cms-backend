import { CreateUpdateGenreResultDto } from '@/modules/books/dto/create-update-genre.dto';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

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

class GenreResultDto extends PartialType(CreateUpdateGenreResultDto) {}

export class FindGenresResultDto {
  @ApiProperty({
    title: 'Znalezione gatunki',
    type: [GenreResultDto],
  })
  genres: GenreResultDto[];
}
