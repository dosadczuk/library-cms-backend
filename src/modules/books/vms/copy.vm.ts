import { Copy } from '@/modules/books/entities';
import { ApiProperty } from '@nestjs/swagger';

export class CopyViewModel {
  @ApiProperty({
    title: 'Identyfikator',
    example: 1,
  })
  readonly id: number;

  @ApiProperty({
    title: 'Numer egzemplarza',
    example: 'ABC123456789',
  })
  readonly number: string;

  constructor(copy: Copy) {
    this.id = copy.id;
    this.number = copy.number;
  }
}
