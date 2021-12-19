import { BorrowViewModel } from '@/modules/books/vms/borrow.vm';
import { TypeNumber } from '@/shared/utils/class-transformer';
import { IsInt, IsNotEmpty } from '@/shared/utils/class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsDateString, IsOptional } from 'class-validator';

export class CreateBookCopyBorrowParamsDto {
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
  @IsOptional()
  @TypeNumber()
  @ApiPropertyOptional({
    name: 'copy_id',
    title: 'Identyfikator egzemplarza, jak pusty to dowolny',
    example: 1,
  })
  readonly copyId: number;
}

export class CreateBookCopyBorrowBodyDto {
  @IsDateString()
  @IsNotEmpty()
  @ApiPropertyOptional({
    title: 'Data, od której obowiązuje wypożyczenie, jak pusta to dzisiejsza',
  })
  dateFrom?: Date;

  @IsInt()
  @IsNotEmpty()
  @TypeNumber()
  @ApiProperty({
    title: 'Identyfikator użytkownika, którzy wypożycza egzemplarz',
    example: 1,
  })
  userId: number;
}

export class CreateBookCopyBorrowResultDto {
  @ApiProperty({
    title: 'Wypożyczenie',
    type: BorrowViewModel,
  })
  readonly borrow: BorrowViewModel;

  constructor(borrow: BorrowViewModel) {
    this.borrow = borrow;
  }
}
