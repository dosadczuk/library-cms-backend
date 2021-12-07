import { CopyViewModel } from '@/modules/books/vms/copy.vm';
import { ApiProperty } from '@nestjs/swagger';

export class FindBookCopiesResultDto {
  @ApiProperty({
    title: 'Znalezione egzemplarze książki',
  })
  readonly copies: CopyViewModel[];

  constructor(copies: CopyViewModel[]) {
    this.copies = copies;
  }
}
