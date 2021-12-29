import { BorrowViewModel } from '@/modules/books/vms/borrow.vm';
import { TypeNumber } from '@/shared/utils/class-transformer';
import { IsInt, IsNotEmpty } from '@/shared/utils/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class FindBookCopyBorrowParamsDto {
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
    title: 'Identyfikator egzemplarza',
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

export class FindBookCopyBorrowResultDto {
  @ApiProperty({
    title: 'Znalezione wypożyczenie',
    type: BorrowViewModel,
  })
  readonly borrow: BorrowViewModel;

  constructor(borrow: BorrowViewModel) {
    this.borrow = borrow;
  }
}