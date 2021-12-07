import { BookViewModel } from '@/modules/books/vms/book.vm';
import { TypeNumber } from '@/shared/decorators/class-transformer';
import { IsInt, IsNotEmpty } from '@/shared/decorators/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FindBookParamsDto {
  @IsInt()
  @IsNotEmpty()
  @TypeNumber()
  @ApiProperty({
    title: 'Identyfikator książki',
    example: 1,
  })
  readonly id: number;
}

export class FindBookResultDto {
  @ApiProperty({
    title: 'Znaleziona książka',
  })
  readonly book: BookViewModel;

  constructor(book: BookViewModel) {
    this.book = book;
  }
}
