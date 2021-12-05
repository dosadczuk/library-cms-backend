import { BookViewModel } from '@/modules/books/vms/book.vm';
import { ApiProperty } from '@nestjs/swagger';

export class FindBookResultDto {
  @ApiProperty({
    title: 'Znaleziona książka',
  })
  readonly book: BookViewModel;

  constructor(book: BookViewModel) {
    this.book = book;
  }
}
