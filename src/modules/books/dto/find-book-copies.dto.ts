import { CopyViewModel } from '@/modules/books/vms/copy.vm';
import { TypeNumber } from '@/shared/decorators/class-transformer';
import { IsInt, IsNotEmpty } from '@/shared/decorators/class-validator';
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
