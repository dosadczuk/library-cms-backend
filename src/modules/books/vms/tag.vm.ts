import { ApiProperty } from '@nestjs/swagger';
import { Tag } from '@/modules/books/entities/tag.entity';

export class TagViewModel {
  @ApiProperty({
    title: 'Identyfikator',
    example: 1,
  })
  readonly id: number;

  @ApiProperty({
    title: 'Wartość',
    example: 'XX wiek',
  })
  readonly value: string;

  constructor(tag: Tag) {
    this.id = tag.id;
    this.value = tag.value;
  }
}