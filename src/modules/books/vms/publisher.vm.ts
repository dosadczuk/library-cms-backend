import { ApiProperty } from '@nestjs/swagger';
import { Publisher } from '@/modules/books/entities/publisher.entity';

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
