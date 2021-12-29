import { Borrow } from '@/modules/books/entities';
import { BorrowViewModel } from '@/modules/books/vms/borrow.vm';
import { UserViewModel } from '@/modules/users/vms/user.vm';
import { ApiProperty } from '@nestjs/swagger';

export class BorrowWithUserViewModel extends BorrowViewModel {
  @ApiProperty({
    title: 'Użytkownik',
  })
  readonly user: UserViewModel;

  constructor(borrow: Borrow) {
    super(borrow);

    this.user = new UserViewModel(borrow.user);
  }
}
