import { Tag } from '@/modules/books/entities/tag.entity';
import { ApiProperty } from '@nestjs/swagger';

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
