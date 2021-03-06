import { BorrowWithUserViewModel } from '@/modules/books/vms';
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
    description: 'Identyfikator książki',
    example: 1,
  })
  readonly bookId: number;

  @Expose({ name: 'copy_id' })
  @IsInt()
  @IsOptional()
  @TypeNumber()
  @ApiProperty({
    name: 'copy_id',
    description: 'Identyfikator egzemplarza',
    example: 1,
  })
  readonly copyId: number;
}

export class CreateBookCopyBorrowBodyDto {
  @IsDateString()
  @IsNotEmpty()
  @ApiPropertyOptional({
    title: 'Data, od której obowiązuje wypożyczenie, jak pusta to dzisiejsza',
    example: new Date().toISOString(),
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
    type: BorrowWithUserViewModel,
  })
  readonly borrow: BorrowWithUserViewModel;

  constructor(borrow: BorrowWithUserViewModel) {
    this.borrow = borrow;
  }
}
