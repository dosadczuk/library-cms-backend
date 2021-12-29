import { Borrow } from '@/modules/books/entities';
import { BorrowViewModel } from '@/modules/books/vms/borrow.vm';
import { CopyWithBookViewModel } from '@/modules/books/vms/copy-with-book.vm';
import { ApiProperty } from '@nestjs/swagger';

export class BorrowWithBookViewModel extends BorrowViewModel {
  @ApiProperty({
    title: 'Egzemplarz',
  })
  readonly copy: CopyWithBookViewModel;

  constructor(borrow: Borrow) {
    super(borrow);

    this.copy = new CopyWithBookViewModel(borrow.copy);
  }
}
