import { CreateUpdateAuthorResultDto } from '@/modules/books/dto/create-update-author.dto';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class FindAuthorsFilterDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional({
    title: 'Imię',
    example: 'Jan',
  })
  firstName?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional({
    title: 'Nazwisko',
    example: 'Kowalski',
  })
  lastName?: string;
}

class AuthorResultDto extends PartialType(CreateUpdateAuthorResultDto) {}

export class FindAuthorsResultDto {
  @ApiProperty({
    title: 'Znalezieni autorzy',
    type: [AuthorResultDto],
  })
  authors: AuthorResultDto[];
}
