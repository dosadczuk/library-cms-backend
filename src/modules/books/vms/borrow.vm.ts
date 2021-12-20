import { Borrow } from '@/modules/books/entities';
import { UserViewModel } from '@/modules/users/vms';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class BorrowViewModel {
  @ApiProperty({
    title: 'Identyfikator',
    example: 1,
  })
  readonly id: number;

  @ApiProperty({
    title: 'Data wypożyczenia',
    example: new Date().toISOString(),
  })
  readonly dateFrom: Date;

  @ApiPropertyOptional({
    title: 'Data oddania',
    example: new Date().toISOString(),
  })
  readonly dateTo?: Date;

  @ApiProperty({
    title: 'Użytkownika',
    example: 1,
  })
  readonly user: UserViewModel;

  constructor(borrow: Borrow) {
    this.id = borrow.id;
    this.dateFrom = borrow.dateFrom;
    this.dateTo = borrow.dateTo;
    this.user = new UserViewModel(borrow.user);
  }
}
