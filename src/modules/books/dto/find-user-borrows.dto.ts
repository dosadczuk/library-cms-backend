import { BorrowWithBookViewModel } from '@/modules/books/vms';
import { TypeNumber } from '@/shared/utils/class-transformer';
import { IsInt, IsNotEmpty } from '@/shared/utils/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FindUserBorrowsParamsDto {
  @IsInt()
  @IsNotEmpty()
  @TypeNumber()
  @ApiProperty({
    title: 'Identyfikator użytkownika',
    example: 1,
  })
  readonly id: number;
}

export class FindUserBorrowsResultDto {
  @ApiProperty({
    title: 'Znalezione wypożyczenia',
    type: [BorrowWithBookViewModel],
  })
  readonly borrows: BorrowWithBookViewModel[];

  constructor(borrows: BorrowWithBookViewModel[]) {
    this.borrows = borrows;
  }
}
