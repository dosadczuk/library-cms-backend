import { Expose } from 'class-transformer';
import { IsInt, IsNotEmpty } from '@/shared/utils/class-validator';
import { TypeNumber } from '@/shared/utils/class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { BorrowWithUserViewModel } from '@/modules/books/vms';

export class GiveBackBookCopyParamsDto {
  @Expose({ name: 'id' })
  @IsInt()
  @IsNotEmpty()
  @TypeNumber()
  @ApiProperty({
    name: 'id',
    title: 'Identyfikator książki',
    example: 1,
  })
  readonly bookId: number;

  @Expose({ name: 'copy_id' })
  @IsInt()
  @IsNotEmpty()
  @TypeNumber()
  @ApiProperty({
    name: 'copy_id',
    title: 'Identyfikator wypożyczenia',
    example: 1,
  })
  readonly copyId: number;

  @Expose({ name: 'borrow_id' })
  @IsInt()
  @IsNotEmpty()
  @TypeNumber()
  @ApiProperty({
    name: 'borrow_id',
    title: 'Identyfikator wypożyczenia',
    example: 1,
  })
  readonly borrowId: number;
}

export class GiveBackBookCopyResultDto {
  @ApiProperty({
    title: 'Wypożyczenie',
    type: BorrowWithUserViewModel,
  })
  readonly borrow: BorrowWithUserViewModel;

  constructor(borrow: BorrowWithUserViewModel) {
    this.borrow = borrow;
  }
}
