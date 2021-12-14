import { CopyViewModel } from '@/modules/books/vms';
import { TypeNumber } from '@/shared/utils/class-transformer';
import { IsInt, IsNotEmpty } from '@/shared/utils/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FindBookCopiesParamsDto {
  @IsInt()
  @IsNotEmpty()
  @TypeNumber()
  @ApiProperty({
    title: 'Identyfikator książki',
    example: 1,
  })
  readonly id: number;
}

export class FindBookCopiesResultDto {
  @ApiProperty({
    title: 'Znalezione egzemplarze książki',
  })
  readonly copies: CopyViewModel[];

  constructor(copies: CopyViewModel[]) {
    this.copies = copies;
  }
}
