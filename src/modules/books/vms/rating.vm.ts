import { Rating } from '@/modules/books/entities';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RatingViewModel {
  @ApiProperty({
    title: 'Identyfikator',
    example: 1,
  })
  readonly id: number;

  @ApiProperty({
    title: 'Ocena',
    example: 4.5,
  })
  readonly value: number;

  @ApiPropertyOptional({
    title: 'Komentarz',
    example: 'Przykładowy komentarz',
  })
  readonly comment?: string;

  constructor(rating: Rating) {
    this.id = rating.id;
    this.value = Number(rating.value);
    this.comment = rating.comment;
  }
}
