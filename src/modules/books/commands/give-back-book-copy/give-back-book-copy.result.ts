import { GiveBackBookCopyResultDto } from '@/modules/books/dto';

export class GiveBackBookCopyResult {
  constructor(readonly borrow: GiveBackBookCopyResultDto) {}
}
