import { Publisher } from '@/modules/books/entities';
import { ApiProperty } from '@nestjs/swagger';

export class PublisherViewModel {
  @ApiProperty({
    title: 'Identyfikator',
    example: 1,
  })
  readonly id: number;

  @ApiProperty({
    title: 'Nazwa',
    example: 'Wydawnictwo Karakter',
  })
  readonly name: string;

  constructor(publisher: Publisher) {
    this.id = publisher.id;
    this.name = publisher.name;
  }
}
