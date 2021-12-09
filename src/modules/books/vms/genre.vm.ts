import { Genre } from '@/modules/books/entities/genre.entity';
import { ApiProperty } from '@nestjs/swagger';

export class GenreViewModel {
  @ApiProperty({
    title: 'Identyfikator',
    example: 1,
  })
  readonly id: number;

  @ApiProperty({
    title: 'Wartość',
    example: 'komedia',
  })
  readonly value: string;

  constructor(genre: Genre) {
    this.id = genre.id;
    this.value = genre.value;
  }
}
