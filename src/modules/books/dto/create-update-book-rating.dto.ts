import { RatingViewModel } from '@/modules/books/vms';
import { TypeNumber } from '@/shared/utils/class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from '@/shared/utils/class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CreateUpdateBookRatingParamsDto {
  @Expose({ name: 'id' })
  @IsInt()
  @IsNotEmpty()
  @TypeNumber()
  @ApiProperty({
    name: 'id',
    title: 'Identyfikator książki',
    example: 1,
  })
  readonly bookId: number;
}

export class CreateUpdateBookRatingBodyDto {
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(5)
  @TypeNumber()
  @ApiProperty({
    title: 'Ocena',
    example: 4.5,
  })
  readonly value: number;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    title: 'Komentarz',
    example: 'Przykładowy komentarz',
  })
  readonly comment?: string;
}

export class CreateUpdateBookRatingResultDto {
  @ApiProperty({
    title: 'Ocena',
  })
  readonly rating: RatingViewModel;

  constructor(rating: RatingViewModel) {
    this.rating = rating;
  }
}
