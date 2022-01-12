import { BorrowWithUserViewModel } from '@/modules/books/vms';
import { TypeNumber } from '@/shared/utils/class-transformer';
import { IsInt, IsNotEmpty } from '@/shared/utils/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class FindBookCopyBorrowsParamsDto {
  @Expose({ name: 'id' })
  @IsInt()
  @IsNotEmpty()
  @TypeNumber()
  @ApiProperty({
    name: 'id',
    description: 'Identyfikator książki',
    example: 1,
  })
  readonly bookId: number;

  @Expose({ name: 'copy_id' })
  @IsInt()
  @IsNotEmpty()
  @TypeNumber()
  @ApiProperty({
    name: 'copy_id',
    description: 'Identyfikator egzemplarza',
    example: 1,
  })
  readonly copyId: number;
}

export class FindBookCopyBorrowsResultDto {
  @ApiProperty({
    title: 'Znalezione wypożyczenia egzemplarza',
    type: [BorrowWithUserViewModel],
  })
  readonly borrows: BorrowWithUserViewModel[];

  constructor(borrows: BorrowWithUserViewModel[]) {
    this.borrows = borrows;
  }
}
