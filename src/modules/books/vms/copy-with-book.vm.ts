import { Copy } from '@/modules/books/entities';
import { BookBaseViewModel } from '@/modules/books/vms/book-base.vm';
import { CopyViewModel } from '@/modules/books/vms/copy.vm';
import { ApiProperty } from '@nestjs/swagger';

export class CopyWithBookViewModel extends CopyViewModel {
  @ApiProperty({
    title: 'Książka',
  })
  readonly book: BookBaseViewModel;

  constructor(copy: Copy) {
    super(copy);

    this.book = new BookBaseViewModel(copy.book);
  }
}
