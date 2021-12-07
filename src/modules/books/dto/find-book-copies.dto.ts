import { CopyViewModel } from '@/modules/books/vms/copy.vm';
import { TypeNumber } from '@/utils/decorators/class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

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
